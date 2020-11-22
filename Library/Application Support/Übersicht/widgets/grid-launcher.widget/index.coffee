command: ""

refreshFrequency: 30000 # ms


# Add more or less <li> tags with <br> tags at constant intervals
# for a grid system at whatever size you want.

render: (output) ->
  """
  <div class="container">
    <ul class="buttons">
      <li class="button" id="chrome"></li>
      <li class="button" id="sketch"></li>
      <li class="button" id="spotify"></li>
      <li class="button" id="dolphin"></li>
      <li class="button" id="terminal"></li><br>
      <li class="button"></li>
      <li class="button"></li>
      <li class="button"></li>
      <li class="button"></li>
      <li class="button"></li><br>
      <li class="button"></li>
      <li class="button"></li>
      <li class="button"></li>
      <li class="button"></li>
      <li class="button"></li><br>
      <li class="button"></li>
      <li class="button"></li>
      <li class="button"></li>
      <li class="button"></li>
      <li class="button"></li><br>
      <li class="button"></li>
      <li class="button"></li>
      <li class="button"></li>
      <li class="button"></li>
      <li class="button"></li>
    </ul>
  </div>
  """

afterRender: (domEl) ->
  $(domEl).on 'click', '#chrome', => @run "open '/Applications/Google Chrome.app'"
  $(domEl).on 'click', '#sketch', => @run "open /Applications/Sketch.app"
  $(domEl).on 'click', '#spotify', => @run "open /Applications/Spotify.app"
  $(domEl).on 'click', '#dolphin', => @run "open /Applications/Dolphin.app"
  $(domEl).on 'click', '#terminal', => @run "open /Applications/Utilities/Terminal.app"

style: """

  padding: 0;
  margin: 0;

  .container {
    position: fixed;
    right: 12px;  //Adjust this to place grid wherever you want.
    bottom: 6px;
  }

  .buttons {
    padding: 3px 3px 0 3px;
    border-radius: 3px;
    width: auto;
    transform:scale(0.6, 0.6); // Adjust this to resize the grid.
  }

  .button {
    height: 1px;
    margin: 4px;
    padding: 10px;
    display: inline-block;
    border-radius: 2px;
    box-shadow: 0 -3px rgba(0, 0, 0, 0.2) inset;
  }

  /*
    Replace 5n with Xn for a grid of width X. Add more colors to adjust.
    If you want a pattern where each column is the same color, set X to
    width + 1 to adjust for the <br> tags.
  */

  .button:nth-child(5n+1) {
    background-color: #FC635E; // Pastel Red
  }
  .button:nth-child(5n+2) {
    background-color: #FDBE41; // Pastel Orange
  }
  .button:nth-child(5n+3) {
    background-color: #35CD4B; // Dull Lime
  }
  .button:nth-child(5n+4) {
    background-color: #3F51B5; // Violet Blue
  }
  .button:nth-child(5n+5) {
    background-color: #9C27B0; // Dark Orchid
  }

"""
