command: `./github-activity.widget/run.sh`,
refreshFrequency: 3600000,
style: "\
#github-activity {\
  position: absolute;\
  left: 10px;\
  top: 790px;\
  border: solid 6px #fff;\
  padding: 8px;\
}",
render: () => {
	return "<style>#github-activity-widget-index-js { width: 100px; height: 100%; }</style>";
},
update: (output, domEl) => {
	domEl.innerHTML += output;
}
