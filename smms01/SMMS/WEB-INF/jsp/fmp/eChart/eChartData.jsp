<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

{
  "tooltip": {"trigger": "item","formatter": "{a} <br/>{b} : {c} ({d}%)"},"legend": { "orient": "vertical", "x": "left",
    "data": ${tooltip_data}
  },
  "toolbox": {
    "show": true,
    "feature": {
      "mark": {
        "show": true
      },
      "dataView": {
        "show": true,
        "readOnly": false
      },
      "magicType": {
        "show": true,
        "type": [
          "pie",
          "funnel"
        ],
        "option": {
          "funnel": {
            "x": "25%",
            "width": "50%",
            "funnelAlign": "left",
            "max": 1548
          }
        }
      },
      "restore": {
        "show": true
      },
      "saveAsImage": {
        "show": true
      }
    }
  },
  "calculable": true,
  "series": [
    {
      "name": "访问来源",
      "type": "pie",
      "radius": "55%",
      "center": [
        "50%",
        "60%"
      ],
      "data": ${series_data}
    }
  ]
}