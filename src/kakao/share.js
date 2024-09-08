import React, { useEffect } from 'react'

const KakaoShareButton = () => {
    useEffect(() => {
        createKakaoButton()
    }, [])

    const createKakaoButton = () => {
        if (window.Kakao) {
            const kakao = window.Kakao

            if (!kakao.isInitialized()) {
                kakao.init("bb1d4054dcb1376ac28b00262f1d60ed")
            }

            kakao.Link.createDefaultButton({
                container: '#kakao-link-btn',
                objectType: 'feed',
                content: {
                    title: '[모바일청첩장] 승훈♥수정 결혼식에 초대합니다!',
                    description: '24.11.16 영등포 더 컨벤션 13:40 AM',
                    imageUrl: "https://raw.githubusercontent.com/1-theji/mobileWeddingCard/main/public/img/IMG01.jpg",
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
                buttons: [
                    {
                        title: '모바일청첩장 보기',
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href,
                        },
                    }
                ],
            })
        }
    }

    return (
        <div className="KakaoShare" id="kakao-link-btn">
            <text className="KakaoShareText">카카오톡으로 공유하기</text>
            <button className="KakaoShareButton">
                <img className="KakaoShareIcon" src={"/img/kakaoshare_button.png"} alt="kakao-share-icon" />
            </button>
        </div>
    )
}

export default KakaoShareButton