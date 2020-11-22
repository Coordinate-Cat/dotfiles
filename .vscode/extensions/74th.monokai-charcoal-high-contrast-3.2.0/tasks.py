import json
import copy

from invoke import context, task

@task
def build_colors(c):

    base_colors = ["#43B9D8", "#43bad875", "#66D9EF15", "#FD971F", "#FD971F15"]

    features = {
        "orange": ["#FD971F", "#FD971F75", "#FD971F15", "#e7dc60", "#e7dc6015"],
        "green": ["#A6E22E", "#A6E22E75", "#A6E22E15", "#43B9D8", "#43B9D815"],
        "purple": ["#AE81FF", "#AE81FF75", "#AE81FF15", "#43B9D8", "#43B9D815"],
        "yellow": ["#e7dc60", "#e7dc6075", "#e7dc6015", "#FD971F", "#FD971F15"],
        "red": ["#f82a5d", "#f82a5d75", "#f82a5d15", "#e7dc60", "#e7dc6015"],
        "gray": ["#8f8f8f", "#8f8f8f75", "#8f8f8f15", "#43B9D8", "#43B9D815"],
        "white": ["#f1f1f1", "#f1f1f175", "#f1f1f115", "#43B9D8", "#43B9D815"],
    }

    with open("themes/Monokai-Charcoal.json") as f:
        base_theme = json.load(f)

    for feature_name, colors in features.items():
        theme = copy.deepcopy(base_theme)
        theme["name"] = theme["name"] + f" ({feature_name})"

        for name, hex_code in theme["colors"].items():
            for i, base_hex_code in enumerate(base_colors):
                if base_hex_code == hex_code:
                    theme["colors"][name] = colors[i]

        file_name = f"themes/Monokai-Charcoal-{feature_name}.json"
        with open(file_name, "w") as f:
            json.dump(theme, f)
        c.run(f"npx prettier --write {file_name}")

@task
def deploy(c):
	c.run("npx vsce package")
	c.run("npx vsce publish")

@task
def convert_vim(c):
    c.run("~/.gem/ruby/2.7.0/bin/tm2vim ./themes/Monokai-Charcoal.xml ./themes/Monokai-Charcoal.vim")

if __name__ == "__main__":
    build_colors(context.Context())