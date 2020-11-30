#! /bin/bash

if [ -f /usr/local/bin/node ]; then
	# If node is installed via Homebrew, use it
	/usr/local/bin/node ./github-activity.widget/src/generate.js
else
	# Fallback to normal
	node ./github-activity.widget/src/generate.js
fi
