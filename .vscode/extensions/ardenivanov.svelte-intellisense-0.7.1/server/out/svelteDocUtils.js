"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildMethodDocumentation(method) {
    if (!method) {
        return null;
    }
    var result = '``` javascript\n';
    if (method.description) {
        result += "/** " + method.description + " */\n";
    }
    result += "function " + method.name + "(";
    method.args.forEach(function (arg) {
        if (arg) {
            result += arg.name + ",";
        }
    });
    if (method.args.length > 0) {
        result = result.substring(0, result.length - 1);
    }
    result += ')\n```';
    return result;
}
exports.buildMethodDocumentation = buildMethodDocumentation;
function buildComputedDocumentation(computed) {
    if (!computed) {
        return null;
    }
    var result = '``` javascript\n';
    if (computed.description) {
        result += "/** " + computed.description + " */\n";
    }
    result += "" + computed.name;
    if (computed.dependencies) {
        result += ': ({';
        computed.dependencies.forEach(function (dependency) {
            result += dependency + ", ";
        });
        result = result.substring(0, result.length - 2);
        result += '})';
    }
    result += '\n```';
    return result;
}
exports.buildComputedDocumentation = buildComputedDocumentation;
function buildPropertyDocumentation(property) {
    if (!property) {
        return null;
    }
    var result = '``` javascript\n';
    if (property.description) {
        result += "/** " + property.description + " */\n";
    }
    result += "" + property.name;
    if (property.type) {
        result += ": " + property.type.text;
    }
    if (property.value) {
        var valueType = typeof (property.value);
        if (valueType === 'string') {
            result += " = '" + property.value + "'";
        }
        else if (valueType === 'number' || valueType === 'boolean') {
            result += " = " + property.value;
        }
    }
    result += '\n```';
    return result;
}
exports.buildPropertyDocumentation = buildPropertyDocumentation;
function buildDocumentation(componentDoc) {
    if (componentDoc === null || componentDoc === undefined) {
        return null;
    }
    var result = "Svelte component\n## " + componentDoc.name + "\n";
    if (componentDoc.description) {
        result += componentDoc.description + "\n";
    }
    result += '``` javascript\n';
    if (componentDoc.data) {
        var publicProperties = componentDoc.data.filter(function (p) { return p.visibility === 'public'; });
        if (publicProperties.length > 0) {
            publicProperties.forEach(function (property) {
                if (property.description) {
                    result += "/** " + property.description + " */\n";
                }
                result += "(data) " + property.name + ": " + property.type.text + "\n";
            });
        }
    }
    if (componentDoc.events) {
        var publicEvents = componentDoc.events.filter(function (e) { return e.visibility === 'public'; });
        if (publicEvents.length > 0) {
            publicEvents.forEach(function (event) {
                if (event.description) {
                    result += "/** " + event.description + " */\n";
                }
                result += "(event) " + event.name + "\n";
            });
        }
    }
    if (componentDoc.slots) {
        var publicSlots = componentDoc.slots;
        if (publicSlots.length > 0) {
            publicSlots.forEach(function (slot) {
                if (slot.description) {
                    result += "/** " + slot.description + " */\n";
                }
                result += "(slot) " + slot.name + "\n";
            });
        }
    }
    result += '```';
    return result;
}
exports.buildDocumentation = buildDocumentation;
function buildSlotPerameterDocumentation(parameter) {
    if (!parameter) {
        return null;
    }
    var result = '``` javascript\n';
    if (parameter.description) {
        result += "/** " + parameter.description + " */\n";
    }
    result += "" + parameter.name;
    result += '\n```';
    return result;
}
exports.buildSlotPerameterDocumentation = buildSlotPerameterDocumentation;
//# sourceMappingURL=svelteDocUtils.js.map