command: "echo $(curl -s http://support-sp.apple.com/sp/product?cc=`system_profiler SPHardwareDataType | awk '/Serial/ {print $4}' | cut -c 9-` | awk -F '<configCode>|<.configCode>' '{print $2}') $(sw_vers -productVersion) $(system_profiler SPHardwareDataType | grep 'Processor Name') $(sysctl -n hw.cpufrequency) $(sysctl -n hw.memsize)  $(sysctl -n hw.ncpu) $(ps aux  | awk 'BEGIN { sum = 0 }  { sum += $3 }; END { print sum }') $(ipconfig getifaddr en1) $(dig +short myip.opendns.com @resolver1.opendns.com) $(sar -n DEV 1 1 2> /dev/null | awk '/en1/{x++}x==2 {print $4,$6;exit}') $(top -l 1 -s 0 | grep PhysMem) $(sysctl -n vm.swapusage) $(df -gH /)" 
# conky-like widget for Mac OS X, works on 10.11.6 and Mid 2009
# Notes:
#   This works on my MacBook. I haven't tested on any others
#      On your MacBook, the command may return a different number of values
#      values is an array of the values output by the command
#      Adjust value's index to match your MacBook
#   don't publish your public IP 
#   Conky uses three comment delimiters: //, <!-- -->, and #
#
# please enhance / simplify

refreshFrequency: 20000

style: """
    // add
    .marquee-anim {
    padding: .5em 0; /* ボーダーや背景が不要ならばここもたぶん不要 */
    overflow: hidden;
    color: orange; /* 文字色 */
    }

    .marquee-anim div {
    display: inline-block;
    padding-left: 100%;
    white-space: nowrap;
    animation: marquee 60s linear infinite;
    }

    @keyframes marquee {
    from {
        transform: translate(0);
    }
    to {
        transform: translate(-100%);
    }
    }

    // Align contents of container
    widget-align = left

    // Position of container on desktop
    top 5px
    left 20%

    // Text settings in container
    color #666
    font-family JetBrains Mono,monospace
    padding 4px 5px
    border solid 1px
    border-radius: 20px
    line-height: 0px
    background-color: #666

    .container
        width: 300px
        height : 0px
        font-size: 11px
        text-align: widget-align
        position: relative
        clear: both

    .stats-container
        width: 100%
        margin-bottom 5px
        border-collapse collapse

    .widget-title
        text-align: widget-align
        text-transform uppercase
        font-weight: 300

    // data to display
    .model
        font-size: 11px
        font-weight: 300
        margin: 0

    .version
        font-size: 11px
        font-weight: 300
        margin: 0

    .processor
        font-size: 11px
        font-weight: 300
        margin: 0

    .speed
        font-size: 11px
        font-weight: 300
        margin: 0

    .memory
        font-size: 11px
        font-weight: 300
        margin: 0

    .memory_used
        font-size: 11px
        font-weight: 300
        margin: 0

    .swap_used
        font-size: 11px
        font-weight: 300
        margin: 0

    .cpu_usage
        font-size: 11px
        font-weight: 300
        margin: 0

    .cpu_cores
        font-size: 11px
        font-weight: 300
        margin: 0

    .disk_avail
        font-size: 11px
        font-weight: 300
        margin: 0

    .disk_used
        font-size: 11px
        font-weight: 300
        margin: 0

    .local_ip
        font-size: 11px
        font-weight: 300
        margin: 0

    .public_ip
        font-size: 11px
        font-weight: 300
        margin: 0

    .upload
        font-size: 11px
        font-weight: 300
        margin: 0

    .download
        font-size: 11px
        font-weight: 300
        margin: 0

"""

render: -> """
    <div class="container marquee-anim">
        <div class="widget-title">(System)<span class='model'></span>(Processor)<span class='processor'></span>(Swap)<span class='swap_used'></span>(Public IP)<span class='public_ip'></span>(Local IP)<span class='local_ip'></span></div>
    </div>
"""

update: (output, domEl) ->
	values = output.split(" ")
	model = values[0] + " " + values[1] + values[2] + " " + values[3] + " " +values[4]
	processor = values[8] + " " + values[9] + " " + values[10] + " " + values[11]
	memory = values[13]/1024/1024/1024
	local_ip = values[16]
	public_ip = values[17]
	swap_used = values[29]
	div = $(domEl)

	div.find('.model').html(model)
	div.find('.processor').html(processor)
	div.find('.swap_used').html(swap_used)
	div.find('.local_ip').html(local_ip)
	div.find('.public_ip').html(public_ip)
