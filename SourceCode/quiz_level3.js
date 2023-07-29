let talks = [
    "Tony : Tim and Melinda are running late.", 
    "Tony : But we have a lot to get through so we should get started. ",
    "Tony : Jason, can you please take minutes today?",
    "Jason : Yes, of course Tony. No Problem.",
    "Tony : Thanks. Okay,let's get the ball rolling. First on the agenda today.",
    "Tony : Carrie, can you please give us an update", 
    "Tony : on the marketing strategy for our new beverage Ginger Cola?",
    "Carrie : Yes, Tony. Well, we have decided to pitch",
    "Carrie : the new ginger Cola as a health and energy drink.",
    "Tony : Fantastic! I think this is will be our next big hit.",
    "Tony : There is no reason that it shouldn't be a winner.",
    "Tony : It tastes great. And it's healthy.",
    "Tony : It has very low calories and it is great for working out.",
    "Tony : Let's make this happen, team.",
    "A few minutes later.",
    "Tony : Where are we with the advertising and promotion strategy?",
    "Carrie : We still have a few things to work out, ",
    "Carrie : but we are planning to have a power hitter ",
    "Carrie : from the Japan baseball league as a celebrity endorsement.",
    "Tony : Great idea. Well, let's set aside more time at the next meeting ",
    "Tony : for a more in depth look at what you have planned.",
    "Tony : Of course, that's really important, ", 
    "Tony : but we have a lot to cover in today's meeting.",
    "Carrie : Okay Tony. I will be ready to present to everyone then.",
    "Tony : Let's move on to the next topic. ",
    "Tony : I have sent around an action list for each of you to take a look at.",
    "Tony : It includes a look at the following calls to action ",
    "Tony : that we need to address for the upcoming charity Walkathon.",
    "Tony : Let's take a few moments and go over everyone's role.",
    "Tony : This is extremely important for us.",
    "Tony : We need to give back to the community."
];


let quizAndAnswers = [
    {
        "question": [
            "Tony: Tim and Melinda are ____1____.",
            "But we have a lot to get through so we should ____2____started.",
            "Jason, can you please ____3____today? Which one is suitable for blank 1?"
        ],
        "answer": [
            ["running late", true],
            ["on time", false],
            ["getting though", false]
        ]
    },
    {
        "question": [
            "Tony: Tim and Melinda are ____1____.",
            "But we have a lot to get through so we should ____2____started.",
            "Jason, can you please ____3____today? Which one is suitable for blank 2?"
        ],
        "answer": [
            ["go", false],
            ["get", true],
            ["at", false]
        ]
    },
    {
        "question": [
            "Tony: Tim and Melinda are ____1____.",
            "But we have a lot to get through so we should ____2____started.",
            "Jason, can you please ____3____today? Which one is suitable for blank 3?"
        ],
        "answer": [
            ["give the minutes", false],
            ["take the minutes", true],
            ["work out", false],
        ]
    },
    {
        "question": [
            "Tony: Thanks. Okay, ____4____. First on the ____5____ today. ",
            "Carrie, can you please give us an update on the marketing ",
            "strategy for our new beverage Ginger Cola? Which one is suitable for blank 4?"
        ],
        "answer": [
            ["let's go", false],
            ["let's call it a day", false],
            ["let's get the ball rolling", true],
        ]
    },
    {
        "question": [
            "Tony: Thanks. Okay, ____4____. First on the ____5____ today. ",
            "Carrie, can you please give us an update on the marketing ",
            "strategy for our new beverage Ginger Cola? Which one is suitable for blank 5?"
        ],
        "answer": [
            ["agenda", true],
            ["meeting", false],
            ["goal", false],
        ]
    },
    {
        "question": [
            "Carrie: Yes, Tony. Well, ",
            "we have decided to ____6____ the new ginger Cola",
            " as a health and energy drink. Which one is suitable for blank 6?"
        ],
        "answer": [
            ["sell", false],
            ["pitch", true],
            ["but", false],
        ]
    },
    {
        "question": [
            "Tony: Fantastic! I think this will be our next ____7____.",
            "There is no reason that it shouldn't be a winner. ",
            "It tastes great. And it's healthy. Which one is suitable for blank 7?"
        ],
        "answer": [
            ["big heart", false],
            ["level", false],
            ["bit hit", true],
        ]
    }
];

let quizAndAnswers2 = [
    {
        "question": [
            "Tony: Where are we with the advertising and promotion __1__?",
            "Carrie: We still have a few things to work out, but we are planning to",
            "have a power hitter from the Japan baseball league as a celebrity __2__.",
            "Which one is suitable for blank 1?"
        ],
        "answer": [
            ["step", false],
            ["action", false],
            ["strategy", true]
        ]
    },
    {
        "question": [
            "Tony: Where are we with the advertising and promotion __1__?",
            "Carrie: We still have a few things to work out, but we are planning to",
            "have a power hitter from the Japan baseball league as a celebrity __2__.",
            "Which one is suitable for blank 2?"
        ],
        "answer": [
            ["endorsement", true],
            ["advertise", false],
            ["speech", false]
        ]
    },
    {
        "question": [
            "Tony: Great idea. Well, let's ___3___ aside more time at the next meeting",
            "for a more ____4____ depth look at what you have planned. Of course, ",
            "that's really important, but we have a lot to ___5___in today's meeting.",
            "Which one is suitable for blank 3?"
        ],
        "answer": [
            ["get", false],
            ["set", true],
            ["on", false],
        ]
    },
    {
        "question": [
            "Tony: Great idea. Well, let's ___3___ aside more time at the next meeting",
            "for a more ____4____ depth look at what you have planned. Of course, ",
            "that's really important, but we have a lot to ___5___in today's meeting.",
            "Which one is suitable for blank 4?"
        ],
        "answer": [
            ["in", true],
            ["at", false],
            ["on", false],
        ]
    },
    {
        "question": [
            "Tony: Great idea. Well, let's ___3___ aside more time at the next meeting",
            "for a more ____4____ depth look at what you have planned. Of course, ",
            "that's really important, but we have a lot to ___5___in today's meeting.",
            "Which one is suitable for blank 5?"
        ],
        "answer": [
            ["view", false],
            ["cover", true],
            ["over", false],
        ]
    }
];

let quizAndAnswers3 = [
    {
        "question": [
            "Tony : I have sent around an action list for each of you to take a look at.",
            "It includes a look at the following ____6____ that we need to ",
            "address for the upcoming charity Walkathon. Which one is suitable for blank 6?"
        ],
        "answer": [
            ["call it a day", false],
            ["go though", false],
            ["calls to action", true]
        ]
    },
    {
        "question": [
            "Tony: Let's take a few moments and go over everyone's role.",
            "This is extremely important for us. We need to ___7__ the community.",
            "Which one is suitable for blank 7?"
        ],
        "answer": [
            ["go started", false],
            ["give back to ", true],
            ["give up", false]
        ]
    }
];