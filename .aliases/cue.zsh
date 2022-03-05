alias cv='cue eval'
# cue export input.cue conditions.cue variables.cue test_target.cue -e outputParams
# rename test_target.cue
function ce() {
    cue export $1 $2 $3 $4 --out json;
}
alias ce=ce