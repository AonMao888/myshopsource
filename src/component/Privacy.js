import React, { useEffect, useState } from 'react'
import langjson from '../json/lang.json'

function Privacy() {
    const [lang, setlang] = useState('english');

    useEffect(() => {
        getlang();
    }, [])

    const getlang = () => {
        let gotlang = localStorage.getItem('lang');
        if (gotlang) {
            setlang(gotlang);
        } else {
            setlang('english');
        }
    }
    return (
        <div className='doc'>
            <h1 className='addtitle'>{langjson[72][lang]}</h1>
            {lang==='myanmar'&&<div className='d'>
                <p className='doctext'>အသုံးပြုသူများ၏ ကိုယ်ရေးအချက်အလက် လုံခြုံရေးသည် ကျွန်ုပ်တို့အတွက် အရေးကြီးပါသည်။ ဤစာမျက်နှာတွင် သင်၏ဒေတာများကို မည်သို့စုဆောင်းထားပုံ၊ အသုံးပြုပုံ၊ ထိန်းသိမ်းကာကွယ်ထားသည်ကို အသေးစိတ်ဖော်ပြထားပါသည်။ ထို့ပြင် ကျွန်ုပ်တို့၏ အက်ပ် (သို့မဟုတ်) ဝန်ဆောင်မှုများကို အသုံးပြုရာတွင် လိုက်နာရမည့် စည်းကမ်းများနှင့် ပတ်သက်၍ ရှင်းလင်းစွာ ဖော်ပြထားပါသည်။</p>
                <div style={{ height: 42 }}></div>
                <h1 className='addtitle'>လုံခြုံရေး</h1>
                <p className='doctext'>ကျွန်ုပ်တို့၏အက်ပ်(သို့) ဝန်ဆောင်မှုများကို အသုံးပြုသူများစတင်အသုံးပြုရာတွင် <b>Google</b> အကောင့်ဖြင့် ဝင်ရောက်ချိတ်ဆက်ရမည်ဖြစ်ပြီး အသုံးပြုသူ၏ <b>Google</b> အကောင့်မှ အကောင့်နာမည်၊ အီးမေးလ်နှင့် ပရိုဖိုင်ပုံများသာ ကောက်ခံမည်ဖြစ်သည်။ အဆိုပါကောက်ခံထားသော အချက်အလက်များကို အက်ပ်တွင်ဖော်ပြပြသရန်သာဖြစ်ပါသည်။</p>
                <p className='doctext'>မြေပုံကြည့်ရှုသည့်စာမျက်နှာတွင်လည်း အသုံးပြုသူ၏အနီးအနားရှိ ဆိုင်များဖော်ပြရန်အတွက်ကြောင့် အသုံးပြုသူ၏တည်နေရာကိုတောင်းဆို၍ သက်ဆိုင်ရာဝန်ဆောင်မှုများပြုလုပ်ပေးသည်။ တောင်းဆိုရရှိသော အသုံးပြုသူ၏တည်နေရာအချက်အလက်ကို အက်ပ်(သို့) database တွင်သိမ်းဆည်းထားခြင်းမျိုးမရှိပါ။</p>
                <p className='doctext'>အသုံးပြုသူ၏ ဆိုင်လုပ်ငန်းဆိုင်ရာအချက်အလက်များကိုလည်း ဤအက်ပ်အတွင်းတွင်သာ အသုံးများမည်ဖြစ်ပါသည်။ ဆိုင်အချက်အလက်၊ ကိုယ်ရေးကိုယ်သာအချက်အလက်များကို ထုတ်ယူအသုံးပြုခြင်း၊ မျှဝေခြင်း၊ အခြားသို့ပေးပို့ခြင်း စသောလုံခြုံရေးချိုးဖောက်ခြင်းမျိုးများ မပြုလုပ်ကြောင်းရှင်းလင်းစွာ တင်ပြချင်ပါသည်။</p>
                <div style={{ height: 42 }}></div>
                <h1 className='addtitle'>စည်းကမ်းများ</h1>
                <p className='doctext'>ကျွန်ုပ်တို့၏အက်ပ်(သို့) ဝန်ဆောင်မှုများကို အသုံးပြုသူများတွင်လည်း လိုက်နာရမည့်စည်းကမ်းများရှိပါသည်။</p>
                <ol>
                    <li>အသုံးပြုသူများအချင်းချင်းလေးစားရမည်</li>
                    <li>အသုံးပြုသူများ၏အချက်အလက်များကိုအလွဲသုံးများမပြုလုပ်ရ</li>
                    <li>လိမ်လည်ခြိမ်းခြောက်ခြင်းမပြုလုပ်ရ</li>
                    <li>အမှားအယွင်းကြော်ငြာခြင်းမပြုရ</li>
                    <li>တရားမဝင်သောအရာများမတင်ရ</li>
                </ol>
                <p className='doctext'>အထက်ပါစည်းကမ်းများနှင့်တကွ ထပ်မံဖြည့်စွပ်မည့်စည်းကမ်းများကို အသုံးပြုသူတိုင်းလိုက်နာရပါမည်။ အထက်ပါစည်းကမ်းများမှ တစ်ခုကိုချိုးဖောက်ခဲ့သည်ရှိသော် လက်ရှိအသုံးပြုနေသောအကောင့်ကို ယာယီ(သို့) အပြီးပိုင်ပိတ်ပင်လိုက်မည်ဖြစ်ပြီး နောက်ထပ်မံဖွင့်လစ်သော အကောင့်သစ်များကိုလည်းခွင့်မပြုပါ။</p>
                <div style={{ height: 69 }}></div>
            </div>}
            {lang==='english'&&<div className='d'>
                <p className='doctext'>The privacy of our users is important to us. This page details how we collect, use, and protect your data. It also clearly states the rules you must follow when using our apps or services.</p>
                <div style={{height:39}}></div>
                <h1 className='addtitle'>Privacy</h1>
                <p className='doctext'>When users start using our apps or services, they are required to sign in with a <b>Google</b> account, and we will only collect the user's <b>Google</b> account information, such as their account name, email address, and profile picture. The collected information is only used to display in app.</p>
                <p className='doctext'>The map view page also requests the user's location to display nearby stores and provide relevant services. The requested user location information is not stored in the app or database.</p>
                <p className='doctext'>User business information will also be used only within this app. We would like to make it clear that we will not use, share, or transmit any store information or personal information to others in any way that violates privacy.</p>
                <div style={{height:39}}></div>
                <h1 className='addtitle'>Rules</h1>
                <p className='doctext'>There are rules that users of our app or services must follow.</p>
                <ol>
                    <li>Users must respect each other.</li>
                    <li>Do not misuse user information.</li>
                    <li>No scam, no threats.</li>
                    <li>Do not advertise false information.</li>
                    <li>Don't post illegal things.</li>
                </ol>
                <p className='doctext'>All users must comply with the above rules and additional rules. Violation of any of the above rules will result in temporary or permanent suspension of the current account, and no new accounts will be allowed.</p>
            </div>}
            {lang==='shan'&&<div className='d'>
                <p className='doctext'>လွင်ႈသုၼ်ႇတူဝ် ၽူႈၸႂ်ႉတိုဝ်းႁဝ်းၶဝ်ၼႆႉ လမ်ႇလွင်ႈတႃႇႁဝ်းၶႃႈတေႉၶႃႈ။ ၼႂ်းၼႃႈလိၵ်ႈၼႆႉ လၢတ်ႈၼႄလွင်ႈ ႁဝ်းၶႃႈ ၵဵပ်းႁွမ်၊ ၸႂ်ႉတိုဝ်း လႄႈ ၵႅတ်ႇၶႄ ၶေႃႈမုၼ်း ၽူႈၸႂ်ႉတိုဝ်းၸိူင်ႉႁိုဝ်။ ယဝ်ႉၵေႃႈ တႅမ်ႈဝႆႉ ပၵ်းပိူင် ဢၼ်ၽူႈၸႂ်ႉတိုဝ်း တေလႆႈႁဵတ်းၸွမ်း မိူဝ်ႈၸႂ်ႉတိုဝ်း ဢႅပ်ႉ (ဢမ်ႇၼၼ်) ဝႅပ်ႉ ႁဝ်းၶႃႈၼၼ်ႉၶႃႈ။</p>
                <div style={{height:42}}></div>
                <h1 className='addtitle'>လွင်ႈသုၼ်ႇတူဝ်</h1>
                <p className='doctext'>မိူဝ်ႈၽူႈၸႂ်ႉတိုဝ်း တႄႇၸႂ်ႉတိုဝ်း ဢႅပ်ႉ (ဢမ်ႇၼၼ်) ဝႅပ်ႉ ႁဝ်းၶႃႈၼၼ်ႉ တေလႆႈၸႂ်ႉတိုဝ်း ဢၵွင်ႉ <b>Google</b> သေၶဝ်ႈ(Sign in)ၶႃႈ။ ဝၢႆးၶဝ်ႈဢၵွင်ႉယဝ်ႉ ႁဝ်းၶႃႈတေၵဵပ်းၶေႃႈမုၼ်း ဢၵွင်ႉ <b>Google</b> ၽူႈၸႂ်ႉတိုဝ်းမိူၼ်ၼင်ႇ ၸိုဝ်ႈၽူႈၸႂ်ႉတိုဝ်း၊ ဢီးမေးလ် လႄႈ ၶႅပ်းႁၢင်ႈ ပရူဝ်ႇၾႆး ၼၼ်ႉၵူၺ်း။ ၶေႃႈမုၼ်းဢၼ်ၵဵပ်းႁွမ်ဝႆႉၼၼ်ႉ ၸႂ်ႉတိုဝ်းတႃႇၼႄ ၼႂ်းဢႅပ်ႉၼႆႉၵူၺ်းၶႃႈ။</p>
                <p className='doctext'>ၼႂ်းၼႃႈလိၵ်ႈ ဢၼ်တူၺ်းၽႅၼ်ႇလိၼ်ၼၼ်ႉၵေႃႈ ယွၼ်းႁႂ်ႈ ၽူႈၸႂ်ႉတိုဝ်းပိုတ်ႇတီႈယူႇ တႃႇၼႄ လၢၼ်ႉၶၢႆၶူဝ်း ဢၼ်မီးႁိမ်းႁွမ်းၼၼ်ႉသေ ႁဵတ်းပၼ် လွင်ႈႁဵတ်းသၢင်ႈ ဢၼ်ၵဵဝ်ႇၵပ်းၼၼ်ႉၵူၺ်းၶႃႈ။ ၶေႃႈမုၼ်း တီႈယူႇ ၽူႈၸႂ်ႉတိုဝ်း ဢၼ်ယွၼ်းဝႆႉၼၼ်ႉ ဢမ်ႇလႆႈသိမ်းဝႆႉ ၼႂ်းဢႅပ်ႉ ဢမ်ႇၼၼ် ၼႂ်းၶေႃႈမုၼ်း database ၶႃႈ။</p>
                <p className='doctext'>ၶေႃႈမုၼ်းၵၢၼ်ပၢႆးမၢၵ်ႈမီး ၽူႈၸႂ်ႉတိုဝ်းၶဝ်ၵေႃႈ တေၸႂ်ႉတိုဝ်းၼႂ်းဢႅပ်ႉၼႆႉၵူၺ်း။ ႁဝ်းၶႃႈ ၶႂ်ႈလၢတ်ႈၸႅင်ႈလႅင်းဝႃႈ ႁဝ်းၶႃႈ တေဢမ်ႇႁဵတ်း လွင်ႈပူၼ်ႉပႅၼ် လွင်ႈႁူမ်ႇလူမ်ႈ မိူၼ်ၼင်ႇ လွင်ႈထွၼ်ဢွၵ်ႇ၊ ပိုၼ်ႈၽေ၊ သူင်ႇဢွၵ်ႇၶေႃႈမုၼ်း ၽူႈၸႂ်ႉတိုဝ်းဢၼ် ၵဵပ်းႁွမ်ဝႆႉသေ တေသိမ်းထိင်းလီလီၶႃႈ။</p>
                <div style={{height:42}}></div>
                <h1 className='addtitle'>ပၵ်းပိူင် မၢႆမီႈ</h1>
                <p className='doctext'>ယဝ်ႉၵေႃႈ မီးပၵ်းပိူင် ဢၼ်ၽူႈၸႂ်ႉတိုဝ်း ဢႅပ်ႉ (ဢမ်ႇၼၼ်) ဝႅပ်ႉ ႁဝ်းၶႃႈ တေလႆႈႁဵတ်းၸွမ်းၶႃႈ။</p>
                <ol>
                    <li>ၽူႈၸႂ်ႉတိုဝ်းၶဝ် တေလႆႈၼပ်ႉယမ်ၵၼ်</li>
                    <li>ယႃႇဢဝ်ၶေႃႈမုၼ်းၽူႈၸႂ်ႉတိုဝ်း ၵႂႃႇၸႂ်ႉတိုဝ်းတီႈၽိတ်းပၵ်းပိူင်</li>
                    <li>ယႃႇပေလႅၼ်လႄႈ လွၵ်ႇငိူတ်ႈ</li>
                    <li>ယႃႇပေပိုၼ်ၽၢဝ်ႇၶၢဝ်ႇၽိတ်း</li>
                    <li>ယႃႇပေတၢင်ႇ၊ ပိုၼ်ၽႄ ဢၼ်ၽိတ်းပၵ်းပိူင်</li>
                </ol>
                <p className='doctext'>ၽူႈၸႂ်ႉတိုဝ်းၵူႈၵေႃႉ တေလႆႈႁဵတ်းၸွမ်း ပၵ်းပိူင်ပႃႈၼိူဝ်လႄႈ ပၵ်းပိူင်ၽိူမ်ႉထႅမ်ၵူႈဢၼ်။ သင်ဝႃႈ ပူၼ်ႉပႅၼ် ပၵ်းပိူင် ဢၼ်လၢတ်ႈမႃးပႃႈၼိူဝ်ၼႆႉ ဢၼ်လႂ်သေဢမ်ႇဝႃႈ တေလႆႈၵိုတ်းယိုတ်း ဢၵွင်ႉ ဢၼ်ၸႂ်ႉတိုဝ်းယူႇယၢမ်းလဵဝ် ၸူဝ်ႈၶၢဝ်း ဢမ်ႇၼၼ် တႃႇသေႇသေ တေဢမ်ႇပၼ် ပိုတ်ႇၸႂ်ႉဢၵွင်ႉမႂ်ႇ။</p>
                <div style={{height:69}}></div>
            </div>}
        </div>
    )
}

export default Privacy
