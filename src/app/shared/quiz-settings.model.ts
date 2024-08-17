export class QuizSettings { 
    timerEnabled: boolean;
    timerDuration?: number; // in seconds
    autoCheckerEnabled: boolean;
    backgroundImage?: string;
    backButton?: boolean;
    questionPerPage?: boolean;
    showTitle?: boolean;
    autoAdvance?: boolean;
    strictMode?: boolean;

    constructor(timerEnabled: boolean,
                autoCheckerEnabled: boolean,
                timerDuration?: number, 
                backgroundImage?: string,
                backButton?: boolean,
                questionPerPage?: boolean,
                showTitle?: boolean,
                autoAdvance?: boolean,
                strictMode?: boolean
            ) {

        this.timerEnabled = timerEnabled;
        this.autoCheckerEnabled = autoCheckerEnabled;
        this.timerDuration = timerDuration;
        this.backgroundImage = backgroundImage;
        this.backButton = backButton;
        this.questionPerPage = questionPerPage;
        this.showTitle = showTitle;
        this.autoAdvance = autoAdvance;
        this.strictMode = strictMode;
    } 

}