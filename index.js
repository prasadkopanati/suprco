Survey
    .StylesManager
    .applyTheme("modern");


var account_name = "SUPR Company";

//"The products and services " + account_name + " provides are as good as, or better than, our main competitors"

var json = {
    "pages": [
        {
            "elements":[
                {
                    "type": "panel",
                    "name": "recommendWorkPlace",
                    "elements" :[
                        {
                            "type": "radiogroup",
                            "choices": [
                                {
                                    "value": "recommendworkplace_YES",
                                    "text": "Yes"
                                }, {
                                    "value": "recommendworkplace_NO",
                                    "text": "No"
                                }
                            ],
                            "colCount": 0,
                            "isRequired": true,
                            "name": "recommendWorkPlace",
                            "title": "I would recommend " + account_name + " as a great place to work"
                        },
                        {
                            "type": "radiogroup",
                            "choices": [
                                {
                                    "value": "proudofworkplace_YES",
                                    "text": "Yes"
                                }, {
                                    "value": "proudofworkplace_NO",
                                    "text": "No"
                                }
                            ],
                            "colCount": 0,
                            "isRequired": true,
                            "name": "proudOfWorkplace",
                            "title": "I am proud to work for " + account_name + " "
                        }

                    ]
                }
            ],
            "name": "OverallEngagement",
            "title": "Overall Engagement"
        },
        {
            "elements":[
                {
                    "type": "panel",
                    "name": "companyperformance",
                    "elements" :[

                        {
                            "type": "radiogroup",
                            "choices": [
                                {
                                    "value": "companyperf_STRONGLY_DISAGREE",
                                    "text": "Strongly Disagree"
                                }, {
                                    "value": "companyperf_SOMEWHAT_DISAGREE",
                                    "text": "Somewhat disagree"
                                }, {
                                    "value": "companyperf_NEUTRAL",
                                    "text": "Somewhat Neither Agree or Disagree"
                                }, {
                                    "value": "companyperf_SOMEWHAT_AGREE",
                                    "text": "Somewhat agree"
                                }, {
                                    "value": "companyperf_STRONGLY_AGREE",
                                    "text": "Strongly Agree"
                                }
                            ],
                            "colCount": 0,
                            "isRequired": true,
                            "name": "companyperf",
                            "title": "The products and services " + account_name + " provides are as good as, or better than, our main competitors"
                        },
                    ]

                }

            ],
            "name": "CompanyPerformance",
            "title": "Company Performance"
        }, {
            "elements": [
                {
                    "type": "panel",
                    "name": "panel_leadership",
                    "elements" :[
                        {
                            "type": "text",
                            "name": "text_leadership",
                            "title": "Leadership Qualities:",
                            "isRequired": true,
                            //"inputFormat": "text"
                        }
                    ]
                }
            ],
            "name": "leadership",
            "title": "Leadership"
        }, {
            "elements": [
                {
                    "type": "panel",
                    "name": "panel_management",
                    "elements" :[
                        {
                            "type": "text",
                            "name": "text_management",
                            "title": "Management Qualities:",
                            "isRequired": true,
                            //"inputFormat": "text"
                        }
                    ]
                }
            ],
            "name": "management",
            "title": "Management"
        }, {
            "elements": [
                {
                    "type": "panel",
                    "name": "panel_collab",
                    "elements" :[
                        {
                            "type": "text",
                            "name": "text_collab",
                            "title": "Collaboration Qualities:",
                            "isRequired": true,
                            //"inputFormat": "text"
                        }
                    ]
                }

            ],
            "name": "collaboration_and_community",
            "title": "Collaboration & Community"
        }, {
            "elements": [],
            "name": "teamwork_and_ownership",
            "title": "Teamwork & Ownership"
        }, {
            "elements": [],
            "name": "enablement",
            "title": "Enablement"
        }, {
            "elements": [],
            "name": "alignment_and_involvement",
            "title": "Alignment & Involvement"
        }, {
            "elements": [],
            "name": "work_life_blend",
            "title": "Work Life Blend"
        }, {
            "elements": [],
            "name": "innovation",
            "title": "Innovation"
        }
    ],
    "showProgressBar": "top",
    "showQuestionNumbers": "off",
    "title": "Culture Survey for " + account_name

};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });

var storageName = "survey_culture_history";
function saveSurveyData(survey) {
    var data = survey.data;
    data.pageNo = survey.currentPageNo;
    window
        .localStorage
        .setItem(storageName, JSON.stringify(data));
}
survey
    .onPartialSend
    .add(function (survey) {
        saveSurveyData(survey);
    });
survey
    .onComplete
    .add(function (survey, options) {
        saveSurveyData(survey);
    });

survey.sendResultOnPageNext = true;
var prevData = window
    .localStorage
    .getItem(storageName) || null;
if (prevData) {
    var data = JSON.parse(prevData);
    survey.data = data;
    if (data.pageNo) {
        survey.currentPageNo = data.pageNo;
    }
}
ReactDOM.render(<Survey.Survey model={survey}/>, document.getElementById("surveyElement"));
