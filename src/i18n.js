import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';


i18n.use(HttpApi).use(LanguageDetector).use(initReactI18next).init({
    supportedLngs:['en','mm'],
    debug:true,
    fallbackLng:'en',
    detection:{
        order:['localStorage','navigator'],
        caches:['localStorage']
    },
    interpolation:{
        escapeValue:false
    },
    resources:{
        en:{
            translation:{
                welcome:"Welcome to Career Hub",
                findJob:"Find your dream job or the perfect candidate for your company.",
                exploreJobs:"Explore Jobs",
                register:"Register",
                login:"Login",
                username:"Username",
                email:"Email",
                password:"Password",
                confirmPassword:"Confirm Password",
                phone:"Phone",
                home:"Home",
                jobs:"Jobs",
                profile:"Profile",
                search:"Search Jobs",
                edit:"Edit",
                delete:"Delete",
                save:"Save",
                cancel:"Cancel",
                createPost:"Create Job Post",
                more:"Learn More",
                gender:"Gender",
                role:"Role",
                seeker:"Job Seeker",
                employer:"Employer",
                male:"Male",
                female:"Female",
                other:"Other",
                haveAcc:"Already have an account?",
                noAcc:"Don't have an account?",
            }
        },
        mm:{
            translation:{
                welcome:"Career Hub မှကြိုဆိုပါတယ်",
                findJob:"သင့်ရဲ့အိမ်မက်ထဲက အလုပ် ဒါမှမဟုတ် သင့်ကုမ္ပဏီအတွက် အသင့်တော်ဆုံးဝန်ထမ်းကို ရှာဖွေလိုက်ပါ",
                exploreJobs:"အလုပ်များကြည့်ရှုရန်",
                register:"မှတ်ပုံတင်ပါ",
                login:"ဝင်ရောက်ပါ",
                username:"အသုံးပြုသူအမည်",
                email:"အီးမေးလ်",
                password:"စကားဝှက်",
                confirmPassword:"အတည်ပြုစကားဝှက်",
                phone:"ဖုန်းနံပါတ်",
                home:"ပင်မစာမျက်နှာ",
                jobs:"အလုပ်ခေါ်စာများ",
                profile:"ပရိုဖိုင်",
                search:"အလုပ်များကို ရှာဖွေပါ",
                edit:"ပြင်ဆင်ပါ",
                delete:"ဖျက်ပါ",
                save:"သိမ်းပါ",
                cancel:"မလုပ်ပါ",
                createPost:"အလုပ်ခေါ်စာ ဖန်တီးရန်",
                more:"ပိုမိုသိရှိရန်",
                role:"ရာထူး",
                seeker:"အလုပ်ရှာသူ",
                employer:"အလုပ်ရှင်",
                gender:"ကျား/မ",
                male:"ယောင်္ကျားလေး",
                female:"မိန်းကလေး",
                other:"အခြား",
                haveAcc:"အကောင့်ရှိပါသလား?",
                noAcc:"အကောင့်မရှိသေးဘူးလား?",
            }
        }
    }
}) 

export default i18n;