import './App.css';
import React, {useEffect} from "react";
import {RenderAfterNavermapsLoaded, NaverMap, Marker} from 'react-naver-maps';
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import KakaoShareButton from "./kakao/share";
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css';
import Snowfall from 'react-snowfall';


function App() {
    const totalImg = 15;
    const SeungHoonAccountNum = "신한 110-328-002457";
    const SeungHoonDadAccountNum = "농협 356-1153-0768-83";
    const SeungHoonMonAccountNum ="농협 970120-39790"
    const oneCrystalAccountNum = "국민 932940-62760";
    const oneCrystalDadstalAccountNum = "국민 426601-01-126258";
    const oneCrystalMomstalAccountNum = "국민 426602-01-126679";


    const [selectedImg, setSelectedImg] = React.useState(1); // 현재 선택된 이미지 상태
    const [touchStartX, setTouchStartX] = React.useState(0);
    const [touchStartY, setTouchStartY] = React.useState(0);
    const [touchEndX, setTouchEndX] = React.useState(0);
    const [touchEndY, setTouchEndY] = React.useState(0);

    const handleClickScrollGallery = () => {
        const element = document.getElementById('gallery');
        if (element) {
            element.scrollIntoView();
        }
    };

    function handleTouchStart(e) {
        setTouchStartX(e.targetTouches[0].clientX);
        setTouchStartY(e.targetTouches[0].clientY);
        e.preventDefault();
    }

    function handleTouchMove(e) {
        setTouchEndX(e.targetTouches[0].clientX);
        setTouchEndY(e.targetTouches[0].clientY);
    }

    function handleTouchEnd() {
        const distanceX = Math.abs(touchStartX - touchEndX);
        const distanceY = Math.abs(touchStartY - touchEndY);
    
        if (distanceX > 90 && distanceY < 90) {
            if (touchStartX - touchEndX > 0) {
                openImage(selectedImg + 1); // 오른쪽으로 넘김
            } else {
                openImage(selectedImg - 1); // 왼쪽으로 넘김
            }
        }
    
        setTouchStartX(0);
        setTouchStartY(0);
        setTouchEndX(0);
        setTouchEndY(0);
    }

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = 'unset';
    }

    function textCopyAlert(text) {
        var copyText = "";
        if (text['oneCrystalAccountNum']) {
            copyText = JSON.stringify(text['oneCrystalAccountNum']);
        } else if (text['oneCrystalDadstalAccountNum']) {
            copyText = JSON.stringify(text['oneCrystalDadstalAccountNum']);
        } else if (text['oneCrystalMomstalAccountNum']) {
            copyText = JSON.stringify(text['oneCrystalMomstalAccountNum']);
        } else if (text['SeungHoonAccountNum']) {
            copyText = JSON.stringify(text['SeungHoonAccountNum']);
        } else if (text['SeungHoonDadAccountNum']) {
            copyText = JSON.stringify(text['SeungHoonDadAccountNum']);
        } else if (text['SeungHoonMonAccountNum']) {
            copyText = JSON.stringify(text['SeungHoonMonAccountNum'])
        }
        alert(copyText + ' 클립보드에 복사되었습니다 :)');
    }

    function openImage(imageId) {
        let newSelectedImg = imageId;

        if (imageId < 1) {
            selectedImg = totalImg;
        } else if (imageId > totalImg) {
            newSelectedImg  = 1;
        }

        setSelectedImg(newSelectedImg); // 선택된 이미지 상태 업데이

        if (document.getElementById("ImageViewWindow").style.display !== "block") {
            document.getElementById("ImageViewWindow").style.display = "block";
        }

        for (let i = 1; i < totalImg+1; i++) {
            if (i === newSelectedImg) { // newSelectedImg로 이미지 표시
                document.getElementById("i"+i).style.display = "inline-block";
            } else {
                document.getElementById("i"+i).style.display = "none";
            }
        }
        disableScroll();
    }

    function closeImage() {
        document.getElementById("ImageViewWindow").style.display = "none";
        for (let i = 1; i < totalImg+1; i++) {
            document.getElementById("i"+i).style.display = "none";
        }
        enableScroll();
    }

    function showMorePhotos() {
        console.log("totalImg : " + totalImg);
        if (document.getElementById("p10").style.display !== "inline") {
            document.getElementById("smb").textContent = "닫기";
            for (let i = 10; i < totalImg+i; i++) {
                console.log("for : " + totalImg);
                document.getElementById("p"+i).style.display = "inline";
            }
            return
        } else {
            document.getElementById("smb").textContent = "더보기";
            for (let i = 10; i < totalImg+i; i++) {
                document.getElementById("p"+i).style.display = "none";
            }
            handleClickScrollGallery();
            return
        }
    }

    function openThanksGroom() {
        if (document.getElementById("GroomAccount").style.display !== "inline-block") {
            document.getElementById("GroomAccount").style.display = "inline-block";
            return
        } else {
            document.getElementById("GroomAccount").style.display = "none";
            return
        }
    }

    function openThanksBride() {
        if (document.getElementById("BrideAccount").style.display !== "inline-block") {
            document.getElementById("BrideAccount").style.display = "inline-block";
            return
        } else {
            document.getElementById("BrideAccount").style.display = "none";
            return
        }
    }

    return (
        
        <RenderAfterNavermapsLoaded
            ncpClientId={"14sw7vmr2u"}
            error={<p>Maps Load Error</p>}
            loading={<p>Maps Loading...</p>}
        >
        <div>
            <div className="GreetingImage">               
                <video className="GreetingSnap" autoPlay loop muted playsInline controls>
                    <source src="/img/gate_1.mp4" type="video/mp4" ></source>
                    <audio autoPlay loop><source src="/img/song.mp3" /></audio>
                </video>            
            </div>
            <div className="animate__animated animate__fadeIn" style={{animationDuration: "4s"}}>
                <p style={{color: "#5B5454", fontSize: "19px", lineHeight: 1.6}}>
                    <br/>
                    2024년 11월 16일 토요일 오후 01:40<br/>
                    더컨벤션 영등포, 2층 다이너스홀<br/><br/>
                </p>
            </div>
            <div className="GreetingMessage">
                <ScrollAnimation animateIn="fadeIn">
                    <img className="FlowerIcon" src="/img/icon_flower.png"/>
                    <p style={{color: "#FAFAF9", fontSize: "25px"}}>승훈 & 수정 결혼합니다</p><br/>
                </ScrollAnimation>
                <text className="TextArea">
                    <ScrollAnimation animateIn="fadeIn">
                        서로 마주 보며 다져온 사람을<br/>
                        이제 함께 한곳을 바라보며 걸어갈 수 있는<br/>
                        큰 사랑으로 키우고자 합니다<br/><br/>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeIn">
                        저희 두 사람이 사랑의 이름으로 지켜나갈 수 있게<br/>
                        앞날을 축복해 주시면 감사하겠습니다.<br/>
                        귀한 발걸음 내어 축복해주신다면<br/>
                        더 없는 기쁨으로 간직하겠습니다.<br/>
                    </ScrollAnimation>
                    <br/><br/>
                    <ScrollAnimation animateIn="fadeIn">
                        지수흥. 하춘자 <text className="SonDaughter">의&nbsp;&nbsp;아들</text>&nbsp;승훈<br/>
                        원종선. 김병순 <text className="SonDaughter">의&nbsp;&nbsp;<text className="Daughter">딸</text></text>&nbsp;수정
                    </ScrollAnimation>
                </text>
            </div>

            <div className="Contacts">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                <div className="ContactTable">
                    <text className="TextArea">
                    <div className="GroomTable">
                        <div className="GroomContact">
                            지 승 훈<br/>
                            <a href="tel:01045388690"><img className="CallIcon" src="/img/call_button.png"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="sms:01045388690"><img className="SmsIcon" src="/img/sms_button.png"/></a><br/>
                            <br/><br/>
                        </div>
                        <div className="GroomDadContact">
                            <text className="ContactParentsText">
                            신랑 아버지&nbsp;&nbsp;지 수 흥<br/>
                                <a href="tel:01030111006">
                                    <img className="CallIcon" src="/img/call_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="sms:01030111006">
                                    <img className="SmsIcon" src="/img/sms_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a>
                                <br/><br/></text>
                        </div>
                        <div className="GroomMomContact">
                            <text className="ContactParentsText">
                            신랑 어머니&nbsp;&nbsp;하 춘 자<br/>
                                <a href="tel:01038481005">
                                    <img className="CallIcon" src="/img/call_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="sms:01038481005">
                                    <img className="SmsIcon" src="/img/sms_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a><br/>
                                <br/></text>
                        </div>
                    </div>
                    <div className="BrideTable">
                        <div className="BrideContact">
                            원 수 정<br/>
                            <a href="tel:01032940627"><img className="CallIcon" src="/img/call_button.png"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="sms:01032940627"><img className="SmsIcon" src="/img/sms_button.png"/></a><br/>
                            <br/><br/>
                        </div>
                        <div className="BrideDadContact">
                            <text className="ContactParentsText">
                                신부 아버지&nbsp;&nbsp;원 종 선<br/>
                                <a href="tel:01032080627">
                                    <img className="CallIcon" src="/img/call_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="sms:01032080627">
                                    <img className="SmsIcon" src="/img/sms_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a>
                                <br/><br/></text>
                        </div>
                        <div className="BrideMomContact">
                            <text className="ContactParentsText">
                                신부 어머니&nbsp;&nbsp;김 병 순<br/>
                                <a href="tel:01022210627">
                                    <img className="CallIcon" src="/img/call_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="sms:01022210627">
                                    <img className="SmsIcon" src="/img/sms_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a><br/>
                                <br/></text>
                        </div>
                    </div>
                    </text>
                </div>
                </ScrollAnimation>
            </div>

            <div className="Splitter"></div>

            <div className="Gallery" id="gallery">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                    <p className="TitleEng">Gallery</p>
                    <hr className="TitleUnderline" />
                    <p className="TitleKor">포 토 갤 러 리</p><br/><br/>
                </ScrollAnimation>

                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                <div className="ThumbnailTable">
                <table>
                    <tr>
                        <div id="p1" className="ThumbnailItem">
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src={"/img/IMG01.jpg"} onClick={() => openImage(1)}/>
                            </div>
                        </div>
                    </tr>
                    <tr>
                        <div id="p2" className="ThumbnailItem">
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG02.jpg" onClick={() => openImage(2)}/>
                            </div>
                        </div>
                    </tr>
                    <tr>
                        <div id="p3" className="ThumbnailItem">
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG03.jpg" onClick={() => openImage(3)}/>
                            </div>
                        </div>
                        <div id="p4" className="ThumbnailItem">
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG04.jpg" onClick={() => openImage(4)}/>
                            </div>
                        </div>
                        <div id="p5" className="ThumbnailItem">
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG05.jpg" onClick={() => openImage(5)}/>
                            </div>
                        </div>
                    </tr>
                    <tr>
                        
                        <div id="p6" className="ThumbnailItem">
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG06.jpg" onClick={() => openImage(6)}/>
                            </div>
                        </div>
                        <div id="p7" className="ThumbnailItem">
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG07.jpg" onClick={() => openImage(7)}/>
                            </div>
                        </div>
                        <div id="p8" className="ThumbnailItem">
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG08.jpg" onClick={() => openImage(8)}/>
                            </div>
                        </div>
                    </tr>
                    <tr>
                        <div id="p9" className="ThumbnailItem">
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG09.jpg" onClick={() => openImage(9)}/>
                            </div>
                        </div>
                        <div id="p10" className="ThumbnailItem" style={{display: "none"}}>
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG10.jpg" onClick={() => openImage(10)}/>
                            </div>
                        </div>
                        <div id="p11" className="ThumbnailItem" style={{display: "none"}}>
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG11.jpg" onClick={() => openImage(11)}/>
                            </div>
                        </div>
                    </tr>
                    <tr>
                        <div id="p12" className="ThumbnailItem" style={{display: "none"}}>
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG12.jpg" onClick={() => openImage(12)}/>
                            </div>
                        </div>
                        <div id="p13" className="ThumbnailItem" style={{display: "none"}}>
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG13.jpg" onClick={() => openImage(13)}/>
                            </div>
                        </div>
                        <div id="p14" className="ThumbnailItem" style={{display: "none"}}>
                            <div className="ThumbnailWrapper">
                                <img className="Thumbnail" src="/img/IMG14.jpg" onClick={() => openImage(14)}/>
                            </div>
                        </div>
                    </tr>                  
                </table>
                </div>
                </ScrollAnimation>

                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                    <button id="smb" className="ShowMoreButton" onClick={showMorePhotos}>
                        더보기
                    </button>
                </ScrollAnimation>

            </div>

            <div className="Splitter"></div>

            <br/><br/><br/>
            <div className="Calendar">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                    <img className="CalendarPic" src="/img/calendar.png"/>
                </ScrollAnimation>
            </div>

            <div className="Location">
                <div className="LocationDetails">
                    <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                        <p className="TitleEng">Location</p>
                        <hr className="TitleUnderline" />
                        <p className="TitleKor">오 시 는 길</p>
                    </ScrollAnimation>

                    <text className="TextArea"><br/>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                            <b>더컨벤션영등포, 2층 다이너스홀</b><br/>
                            서울 영등포구 국회대로38길 2, 2층 (다이너스홀)<br/>
                            <text className="ContentsDescTextArea">(tel) 02-6426-5000</text><br/>
                        </ScrollAnimation>
                    </text>
                </div>
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                    <div className="LocationMap">
                        <NaverMap
                            mapDivId={"map"}
                            style={{ width: '100%', height: '35vh'}}
                            defaultCenter={{ lat: 37.5267024, lng: 126.8987777 }}
                            defaultZoom={15}>
                            <Marker
                                key={1}
                                position={{ lat: 37.5267024, lng: 126.8987777 }}
                                infoWindow={{content: "더컨벤션 영등포"}}
                                animation={2} />
                        </NaverMap>
                    </div>
                </ScrollAnimation>
                <div className="Transportation">
                    <text className="TextArea">
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                        <text className="TransportationType">지 하 철</text><br/>
                            <text className="ContentsTextArea">2호선, 5호선 <u>영등포 구청역 하차</u><br/>
                                <text className="ContentsDescTextArea">(<u>4번 출구 방향</u>(도보 3분)<br/></text>
                            </text>
                        <br/><br/>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                        <text className="TransportationType" id="publicBus">버 스</text><br/>
                            <text className="ContentsTextArea">영등포 경찰서, 영등포구청역 하차 후 도보 이용<br/>
                                일반 : 5, 70-3 / 지선 : 5620, 6631, 6637 <br/>
                                마을 : 영등포02, 12
                            </text>
                        <br/><br/>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                        <text className="TransportationType">자 가 용 (주 차)</text><br/>
                            <text className="ContentsTextArea">네이게이셔션 [서울 영등포구 당산동 3가 93-2]검색 </text><br/>
                            <text className="ContentsTextArea">웨딩홀 지하 주차장 1, 2층 </text><br/>
                            <text className="ContentsDescTextArea">웨딩홀 맞은편 공영주차장 이용 가능</text>
                        <br/><br/><br/>
                        </ScrollAnimation>
                        
                    </text>

                </div>
            </div>

            <div className="Splitter"></div>

            <div className="Thanks">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                    <p className="TitleEng">Thanks</p>
                    <hr className="TitleUnderline" />
                    <p className="TitleKor">마 음 전 하 실 곳</p><br/><br/>
                </ScrollAnimation>

                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                <button className="ShowGiftButton" onClick={openThanksGroom}>
                    신랑측 마음 전하실 곳
                </button>
                <div className="AccountInfo" id="GroomAccount">
                    <text className="AccountTextArea">
                        <div className="animate__animated animate__fadeIn">
                            <text className="AccountTitle">신랑 아버지 계좌번호</text><br/>
                            <text className="AccountInfoText">
                                <CopyToClipboard className="CopyText" text={SeungHoonDadAccountNum} onCopy={() => textCopyAlert({SeungHoonDadAccountNum})}>
                                    <text>{SeungHoonDadAccountNum}</text></CopyToClipboard>&nbsp;&nbsp;&nbsp;(지수흥)
                            </text>
                            <div className="AccountInfoBtn">
                                <CopyToClipboard text={SeungHoonDadAccountNum} onCopy={() => textCopyAlert({SeungHoonDadAccountNum})}>
                                    <img className="AccountCopyIcon" src="/img/acc_copy_button.png"/></CopyToClipboard>
                            </div>
                        <br/>
                        <text className="AccountTitle">신부 어머니 계좌번호</text><br/>
                        <text className="AccountInfoText">
                            <CopyToClipboard className="CopyText" text={SeungHoonMonAccountNum} onCopy={() => textCopyAlert({SeungHoonMonAccountNum})}>
                                <text>{SeungHoonMonAccountNum}</text></CopyToClipboard>&nbsp;&nbsp;&nbsp;(하춘자)&nbsp;&nbsp;
                        </text>
                            <div className="AccountInfoBtn">
                                <CopyToClipboard text={SeungHoonMonAccountNum} onCopy={() => textCopyAlert({SeungHoonMonAccountNum})}>
                                    <img className="AccountCopyIcon" src="/img/acc_copy_button.png"/></CopyToClipboard>
                            </div>
                        <br/>
                        <text className="AccountTitle">신랑 계좌번호</text><br/>
                        <text className="AccountInfoText">
                            <CopyToClipboard className="CopyText" text={SeungHoonAccountNum} onCopy={() => textCopyAlert({SeungHoonAccountNum})}>
                                <text>{SeungHoonAccountNum}</text></CopyToClipboard>&nbsp;&nbsp;&nbsp;(지승훈)
                        </text>
                            <div className="AccountInfoBtn">
                                <CopyToClipboard text={SeungHoonAccountNum} onCopy={() => textCopyAlert({SeungHoonAccountNum})}>
                                    <img className="AccountCopyIcon" src="/img/acc_copy_button.png"/></CopyToClipboard>&nbsp;&nbsp;
                                <a href="https://qr.kakaopay.com/Ej7sM1jSue">
                                    <img className="KakaoPayIcon" src="/img/kakaopay_button.png"/>
                                </a>
                            </div>
                        </div>
                            <br/>
                    </text>
                </div>


                <br/>
                <button className="ShowGiftButton" onClick={openThanksBride}>
                    신부측 마음 전하실 곳
                </button>
                <div className="AccountInfo" id="BrideAccount">
                    <text className="AccountTextArea">
                        <div className="animate__animated animate__fadeIn">
                            <text className="AccountTitle">신부 아버지 계좌번호</text><br/>
                        <text className="AccountInfoText">
                            <CopyToClipboard className="CopyText" text={oneCrystalDadstalAccountNum} onCopy={() => textCopyAlert({oneCrystalDadstalAccountNum})}>
                                <text>{oneCrystalDadstalAccountNum}</text></CopyToClipboard>&nbsp;&nbsp;&nbsp;(원종선)
                        </text>
                            <div className="AccountInfoBtn">
                                <CopyToClipboard text={oneCrystalDadstalAccountNum} onCopy={() => textCopyAlert({oneCrystalDadstalAccountNum})}>
                                    <img className="AccountCopyIcon" src="/img/acc_copy_button.png"/></CopyToClipboard>
                            </div>
                        <br/>
                        <text className="AccountTitle">신부 어머니 계좌번호</text><br/>
                        <text className="AccountInfoText">
                            <CopyToClipboard className="CopyText" text={oneCrystalMomstalAccountNum} onCopy={() => textCopyAlert({oneCrystalMomstalAccountNum})}>
                                <text>{oneCrystalMomstalAccountNum}</text></CopyToClipboard>&nbsp;&nbsp;&nbsp;(김병순)&nbsp;&nbsp;
                        </text>
                            <div className="AccountInfoBtn">
                                <CopyToClipboard text={oneCrystalMomstalAccountNum} onCopy={() => textCopyAlert({oneCrystalMomstalAccountNum})}>
                                    <img className="AccountCopyIcon" src="/img/acc_copy_button.png"/></CopyToClipboard>
                            </div>
                        <br/>
                        <text className="AccountTitle">신부 계좌번호</text><br/>
                        <text className="AccountInfoText">
                            <CopyToClipboard className="CopyText" text={oneCrystalAccountNum} onCopy={() => textCopyAlert({oneCrystalAccountNum})}>
                                <text>{oneCrystalAccountNum}</text></CopyToClipboard>&nbsp;&nbsp;&nbsp;(원수정)&nbsp;&nbsp;
                        </text>
                            <div className="AccountInfoBtn">
                                <CopyToClipboard text={oneCrystalAccountNum} onCopy={() => textCopyAlert({oneCrystalAccountNum})}>
                                    <img className="AccountCopyIcon" src="/img/acc_copy_button.png"/></CopyToClipboard>&nbsp;&nbsp;
                                <a href="https://qr.kakaopay.com/Ej9R2QBZM">
                                    <img className="KakaoPayIcon" src="/img/kakaopay_button.png"/>
                                </a>
                            </div>
                        </div>
                        <br/>
                    </text>
                </div>
                </ScrollAnimation>

                <br/><br/>
            </div>

            <div className="Splitter"></div>

            <div className="QnA">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                    <p className="TitleEng">FAQ</p>
                    <hr className="TitleUnderline" />
                    <p className="TitleKor">자 주 묻 는 질 문</p><br/>
                </ScrollAnimation>

                <text className="TextArea">
                    <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                    <text className="TransportationType">Q. 신혼여행은 어디로 가나요?</text><br/>
                    <text className="ContentsTextArea">A. 로마 & 파리로 갑니다!</text>
                    </ScrollAnimation>
                    <br/>
                    <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                        <text className="TransportationType">Q. 밥이 맛있다던데..</text><br/>
                        <text className="ContentsTextArea">A. 다양한 음식으로 구성된 뷔페로 준비했습니다. <br/>마음껏 드세요!</text>
                    </ScrollAnimation>
                </text>

                <br/><br/><br/>
            </div>

            <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                <div className="Share">
                    <KakaoShareButton />
                </div>
            </ScrollAnimation>
            <br/><br/><br/>

            <div className="Footer">
                <p>Designed & Developed by SeungHoon</p>
            </div>

            <div id="ImageViewWindow" className="ImageViewWindow">
                <div className="CloseButtonPanel">
                    <img className="CloseButton" src="/img/close_button.png" onClick={closeImage}/>
                </div>
                <div className="ImageSlide">
                    <div className="ImageSlideItem">
                        <img id="i1" className="Image" src="/img/IMG01.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(1)}/>
                        <img id="i2" className="Image" src="/img/IMG02.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(2)}/>
                        <img id="i3" className="Image" src="/img/IMG03.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(3)}/>
                        <img id="i4" className="Image" src="/img/IMG04.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(4)}/>
                        <img id="i5" className="Image" src="/img/IMG05.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(5)}/>
                        <img id="i6" className="Image" src="/img/IMG06.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(6)}/>
                        <img id="i7" className="Image" src="/img/IMG07.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(7)}/>
                        <img id="i8" className="Image" src="/img/IMG08.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(8)}/>
                        <img id="i9" className="Image" src="/img/IMG09.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(9)}/>
                        <img id="i10" className="Image" src="/img/IMG10.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(10)}/>
                        <img id="i11" className="Image" src="/img/IMG11.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(11)}/>
                        <img id="i12" className="Image" src="/img/IMG12.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(12)}/>
                        <img id="i13" className="Image" src="/img/IMG13.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(13)}/>
                        <img id="i14" className="Image" src="/img/IMG14.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(14)}/>
                                                     
                             
                    </div>
                </div>
                <button className="PrevButtonPanel" onClick={() => openImage(selectedImg-1, selectedImg)}>
                    <img className="PrevButton" src="/img/left_button.png"/>
                </button>
                <button className="NextButtonPanel" onClick={() => openImage(selectedImg+1, selectedImg)}>
                    <img className="NextButton" src="/img/right_button.png"/>
                </button>
            </div>

        </div>
        </RenderAfterNavermapsLoaded>
    );
}


export default App;
