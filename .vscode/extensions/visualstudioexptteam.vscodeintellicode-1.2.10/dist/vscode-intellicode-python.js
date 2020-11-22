"use strict";
/*! Copyright (c) Microsoft Corporation. All rights reserved. */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PythonSupport = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vscode = __importStar(require("vscode"));
const genericErrorMessage = "Cannot start IntelliCode support for Python. See output window for more details.";
const defaultAnalyzerName = "intellisense-members";
const lstmAnalyzerName = "intellisense-members-lstm";
const lstmPylanceAnalyzerName = "intellisense-members-lstm-pylance";
const scopesToTry = [
    vscode.ConfigurationTarget.Global,
    vscode.ConfigurationTarget.Workspace,
    vscode.ConfigurationTarget.WorkspaceFolder,
];
const notificationMessage = "IntelliCode Python support requires you to use the Microsoft Python Language Server (preview).";
const actionLabel = "Enable it and Reload Window";
const lsTypeSettingName = "languageServer";
const MPLS = "Microsoft";
const Pylance = "Pylance";
const Node = "Node";
const PYTHON_EXTENSION_ID = "ms-python.python";
const PYLANCE_EXTENSION_ID = "ms-python.vscode-pylance";
class PythonSupport {
    constructor() {
        this.logger = () => { };
    }
    getRequestedConfig() {
        const pythonExtension = vscode.extensions.getExtension(PYTHON_EXTENSION_ID);
        if (!pythonExtension) {
            return [];
        }
        const pylanceExtension = vscode.extensions.getExtension(PYLANCE_EXTENSION_ID);
        if (pylanceExtension) {
            return [];
        }
        const json = pythonExtension.packageJSON;
        const jediEnabledExists = json.contributes.configuration.properties["python.jediEnabled"] !== undefined;
        if (!json.languageServerVersion) {
            return [];
        }
        if (jediEnabledExists) {
            return [
                {
                    scopeName: "python",
                    settingName: "jediEnabled",
                    desiredValue: false,
                    required: true,
                    scopesToTry,
                    reloadWindowAfterApplying: true,
                    notificationMessage,
                    actionLabel,
                },
            ];
        }
        const config = vscode.workspace.getConfiguration("python");
        const lsType = config ? config.get(lsTypeSettingName) : undefined;
        if (lsType !== Pylance && lsType !== Node) {
            return [
                {
                    scopeName: "python",
                    settingName: lsTypeSettingName,
                    desiredValue: MPLS,
                    required: true,
                    scopesToTry,
                    reloadWindowAfterApplying: true,
                    notificationMessage,
                    actionLabel,
                },
            ];
        }
        return [];
    }
    activate(api, logger) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger = logger;
            const pythonExtension = vscode.extensions.getExtension(PYTHON_EXTENSION_ID);
            if (!pythonExtension) {
                const err = "Microsoft Python extension is not installed.";
                this.logger(err);
                return Promise.reject(err);
            }
            const config = vscode.workspace.getConfiguration("python");
            if (!config) {
                this.logger("Unable to find Python configuration section.");
                return;
            }
            const ls = config.get(lsTypeSettingName);
            if (!ls || ls === "None") {
                this.logger(`Language server is set to ${ls || "undefined"}, IntelliCode is unable to continue.`);
                return;
            }
            this.logger(`Language server is set to ${ls}.`);
            if (ls === MPLS) {
                return this.handlePythonExtensionV1(api, pythonExtension);
            }
            if (ls === Pylance || ls === Node) {
                return this.handlePythonExtensionV2(api, pythonExtension);
            }
        });
    }
    handlePythonExtensionV1(api, pythonExtension) {
        return __awaiter(this, void 0, void 0, function* () {
            const useDeepLearning = api.isFeatureEnabled("python.deepLearning");
            const analyzerName = useDeepLearning ? lstmAnalyzerName : defaultAnalyzerName;
            const intelliCodeAssemblyName = useDeepLearning ? "IntelliCodeForPythonLstm.dll" : "IntellicodeForPython2.dll";
            const assembly = path_1.default.join(__dirname, intelliCodeAssemblyName);
            try {
                fs_1.default.accessSync(assembly, fs_1.default.constants.F_OK);
            }
            catch (err) {
                this.logger(`Python Language Server extension assembly doesn't exist in ${assembly}. Please reinstall IntelliCode.`);
                return Promise.reject(err);
            }
            let model = yield this.acquireModel(api, analyzerName);
            if (!model && analyzerName === lstmAnalyzerName) {
                this.logger("No deep learning model available for Python, fall back to the default model.");
                model = yield this.acquireModel(api, defaultAnalyzerName);
            }
            if (!model) {
                this.logger("No model available for Python, cannot continue.");
                return;
            }
            yield this.activatePythonExtension(pythonExtension);
            const typeName = "Microsoft.PythonTools.Analysis.Pythia.LanguageServerExtensionProvider";
            const command = vscode.commands.executeCommand("python._loadLanguageServerExtension", {
                assembly,
                typeName,
                properties: {
                    modelPath: model.modelPath,
                },
            });
            if (!command) {
                this.logger("Couldn't find language server extension command. Is the installed version of Python 2018.7.0 or later?");
                return Promise.reject(new Error(genericErrorMessage));
            }
        });
    }
    handlePythonExtensionV2(api, pythonExtension) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger("Acquiring model");
            let model = yield this.acquireModel(api, lstmPylanceAnalyzerName);
            if (!model) {
                this.logger("No model v2 available for Python, trying v1.");
                model = yield this.acquireModel(api, lstmAnalyzerName);
                if (!model) {
                    this.logger("No model available for Python, cannot continue.");
                    return;
                }
            }
            this.logger("Activating Python extension");
            yield this.activatePythonExtension(pythonExtension);
            try {
                yield vscode.commands.executeCommand("python.intellicode.loadLanguageServerExtension", {
                    modelPath: model.modelPath,
                });
            }
            catch (e) {
                const message = `Language server extension command failed. Exception: ${e.stack}`;
                this.logger(message);
                return Promise.reject(new Error(message));
            }
        });
    }
    activatePythonExtension(pythonExtension) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!pythonExtension.isActive) {
                yield pythonExtension.activate();
            }
            yield pythonExtension.exports.ready;
        });
    }
    acquireModel(api, analyzerName) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = api.ModelAcquisitionService.getModelProvider("python", analyzerName).getModelAsync();
            if (model) {
                const modelJson = JSON.stringify(model);
                this.logger(`vs-intellicode-python was passed a model: ${modelJson}.`);
            }
            return model;
        });
    }
}
exports.PythonSupport = PythonSupport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnNjb2RlLWludGVsbGljb2RlLXB5dGhvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy92c2NvZGUtaW50ZWxsaWNvZGUtcHl0aG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnRUFBZ0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHaEUsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUN4QiwrQ0FBaUM7QUFFakMsTUFBTSxtQkFBbUIsR0FBVyxrRkFBa0YsQ0FBQztBQUN2SCxNQUFNLG1CQUFtQixHQUFHLHNCQUFzQixDQUFDO0FBQ25ELE1BQU0sZ0JBQWdCLEdBQUcsMkJBQTJCLENBQUM7QUFDckQsTUFBTSx1QkFBdUIsR0FBRyxtQ0FBbUMsQ0FBQztBQUVwRSxNQUFNLFdBQVcsR0FBRztJQUNoQixNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTTtJQUNqQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUztJQUNwQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsZUFBZTtDQUM3QyxDQUFDO0FBQ0YsTUFBTSxtQkFBbUIsR0FDckIsZ0dBQWdHLENBQUM7QUFDckcsTUFBTSxXQUFXLEdBQUcsNkJBQTZCLENBQUM7QUFFbEQsTUFBTSxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztBQUUzQyxNQUFNLElBQUksR0FBRyxXQUFXLENBQUM7QUFFekIsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBRTFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUVwQixNQUFNLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO0FBQy9DLE1BQU0sb0JBQW9CLEdBQUcsMEJBQTBCLENBQUM7QUFFeEQsTUFBYSxhQUFhO0lBQTFCO1FBQ1ksV0FBTSxHQUEwQixHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUF3TXJELENBQUM7SUFuTUcsa0JBQWtCO1FBUWQsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFLRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDOUUsSUFBSSxnQkFBZ0IsRUFBRTtZQUNsQixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBRUQsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLFNBQVMsQ0FBQztRQUV4RyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBSTdCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxJQUFJLGlCQUFpQixFQUFFO1lBR25CLE9BQU87Z0JBQ0g7b0JBQ0ksU0FBUyxFQUFFLFFBQVE7b0JBQ25CLFdBQVcsRUFBRSxhQUFhO29CQUMxQixZQUFZLEVBQUUsS0FBSztvQkFDbkIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsV0FBVztvQkFDWCx5QkFBeUIsRUFBRSxJQUFJO29CQUMvQixtQkFBbUI7b0JBQ25CLFdBQVc7aUJBQ2Q7YUFDSixDQUFDO1NBQ0w7UUFHRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBUyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDMUUsSUFBSSxNQUFNLEtBQUssT0FBTyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDdkMsT0FBTztnQkFDSDtvQkFDSSxTQUFTLEVBQUUsUUFBUTtvQkFDbkIsV0FBVyxFQUFFLGlCQUFpQjtvQkFDOUIsWUFBWSxFQUFFLElBQUk7b0JBQ2xCLFFBQVEsRUFBRSxJQUFJO29CQUNkLFdBQVc7b0JBQ1gseUJBQXlCLEVBQUUsSUFBSTtvQkFDL0IsbUJBQW1CO29CQUNuQixXQUFXO2lCQUNkO2FBQ0osQ0FBQztTQUNMO1FBR0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUssUUFBUSxDQUFDLEdBQXFCLEVBQUUsTUFBNkI7O1lBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBR3JCLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDbEIsTUFBTSxHQUFHLEdBQUcsOENBQThDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM5QjtZQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7Z0JBQzVELE9BQU87YUFDVjtZQUdELE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQVMsaUJBQWlCLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxNQUFNLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxXQUFXLHNDQUFzQyxDQUFDLENBQUM7Z0JBQ2xHLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxNQUFNLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEQsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNiLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUM3RDtZQUNELElBQUksRUFBRSxLQUFLLE9BQU8sSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUMvQixPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7YUFDN0Q7UUFDTCxDQUFDO0tBQUE7SUFFYSx1QkFBdUIsQ0FDakMsR0FBcUIsRUFDckIsZUFBc0M7O1lBRXRDLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO1lBQzlFLE1BQU0sdUJBQXVCLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUM7WUFDL0csTUFBTSxRQUFRLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztZQUUvRCxJQUFJO2dCQUNBLFlBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFlBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUM7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixJQUFJLENBQUMsTUFBTSxDQUNQLDhEQUE4RCxRQUFRLGlDQUFpQyxDQUMxRyxDQUFDO2dCQUNGLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM5QjtZQUVELElBQUksS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLEtBQUssSUFBSSxZQUFZLEtBQUssZ0JBQWdCLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsOEVBQThFLENBQUMsQ0FBQztnQkFDNUYsS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzthQUM3RDtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPO2FBQ1Y7WUFFRCxNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNwRCxNQUFNLFFBQVEsR0FBRyx1RUFBdUUsQ0FBQztZQUN6RixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQ0FBcUMsRUFBRTtnQkFDbEYsUUFBUTtnQkFDUixRQUFRO2dCQUNSLFVBQVUsRUFBRTtvQkFDUixTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7aUJBQzdCO2FBQ0osQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDVixJQUFJLENBQUMsTUFBTSxDQUNQLHdHQUF3RyxDQUMzRyxDQUFDO2dCQUNGLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7YUFDekQ7UUFDTCxDQUFDO0tBQUE7SUFFYSx1QkFBdUIsQ0FDakMsR0FBcUIsRUFDckIsZUFBc0M7O1lBR3RDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUUvQixJQUFJLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLHVCQUF1QixDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLENBQUMsTUFBTSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7Z0JBQzVELEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO29CQUMvRCxPQUFPO2lCQUNWO2FBQ0o7WUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDM0MsTUFBTSxJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDcEQsSUFBSTtnQkFDQSxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGdEQUFnRCxFQUFFO29CQUNuRixTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7aUJBQzdCLENBQUMsQ0FBQzthQUNOO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsTUFBTSxPQUFPLEdBQUcsd0RBQXdELENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDckIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDN0M7UUFDTCxDQUFDO0tBQUE7SUFFYSx1QkFBdUIsQ0FBQyxlQUFzQzs7WUFDeEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUU7Z0JBQzNCLE1BQU0sZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3BDO1lBQ0QsTUFBTSxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFYSxZQUFZLENBQUMsR0FBcUIsRUFBRSxZQUFvQjs7WUFDbEUsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNuRyxJQUFJLEtBQUssRUFBRTtnQkFDUCxNQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLDZDQUE2QyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2FBQzFFO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztLQUFBO0NBQ0o7QUF6TUQsc0NBeU1DIn0=