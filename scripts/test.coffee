module.exports = (robot) ->
  robot.hear /(\bhug\b|\bhugs\b)/i, (res) ->
    res.send "(heart)"