module.exports = (robot) ->
  robot.hear /hug/i, (res) ->
    res.send "(heart)"