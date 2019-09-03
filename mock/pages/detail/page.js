module.exports = {
    title: 'detail',
    url: '/detail',
    template: 'detail',
    dll: {
        // detail: ['axios']
    },
    entry: {
        detail: '@pages/detail/index.js'
    },
    data: {
        urls:{
            upImgUrl : '/custom_resume/upimg/upimg',
            createCompanyUrl: '/custom_resume/createCompanyUrl',
            createCollegeUrl: '/custom_resume/createCollegeUrl',

            getAllIndustry: '/custom_resume/getAllIndustry',
            getAllCollege: '/custom_resume/getAllCollege',
            getAllCompany: '/custom_resume/getAllCompany',
            getAllPosition: '/custom_resume/getAllPosition',
            getAllCountry: '/custom_resume/getAllCountry',
            getAllCity: '/custom_resume/getAllCity.do',
            selfBasicUrl: '/custom_resume/selfBasicUrl.do',
            selfIntroduceUrl: '/custom_resume/selfIntroduceUrl.do',
            selfWorkexpUrl: '/custom_resume/selfWorkexpUrl.do',
            getRocketMajor: '/custom_resume/getrocketmajor',

            selfEducationUrl: '/custom_resume/selfEducationUrl',
            selfProjectexpUrl: '/custom_resume/selfProjectexpUrl',
            selfAwardsUrl: '/custom_resume/selfAwardsUrl' ,
            selfWorksUrl: '/custom_resume/selfWorksUrl' ,
            selfIntentionUrl: '/custom_resume/selfIntentionUrl',
            selfLanguageUrl: '/custom_resume/selfLanguageUrl',

            selfSkillUrl: '/custom_resume/selfSkillUrl',
            selfCredentialsUrl: '/custom_resume/selfCredentialsUrl',

            selfSchoolJobUrl: '/custom_resume/selfSchoolJobUrl',


            selfOtherFieldsUrl: '/custom_resume/selfOtherFieldsUrl',


            submitCustomProfile: '/custom_resume/submitCustomProfileV2.do',

            selfIDPhotoUrl: '/custom_resume/selfIDPhotoUrl',

            getGuidedEditCompleteness: '/custom_resume/getGuidedEditCompleteness',

        },
    }
};
