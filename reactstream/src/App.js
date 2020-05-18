import React, { useEffect } from 'react'
import Hls from 'hls.js'
import flv from 'flv.js'
export default function App(){
    const videoRef=React.createRef();

    // useEffect(()=>{
    //     var flvPlayer =flv.createPlayer({

    //         type:"flv",
    //         url:"http://localhost:8000/live/video.flv"
    //     })
    //     flvPlayer.attachMediaElement(videoRef.current)
    //     flvPlayer.load()
    // },[])
    useEffect(()=>{
        if (Hls.isSupported()) {
            var hls=new Hls({})
            hls.loadSource("http://localhost:8000/live/video.m3u8")
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                videoRef.current.play();
            });   
        }else if(videoRef.current.canPlayType('application/vnd.apple.mpegurl')){
            videoRef.current.src = "http://localhost:8000/live/video.m3u8"
            videoRef.current.addEventListener('loadedmetadata', function() {
            videoRef.current.play();
    });
        }
        
    })
    return (
        <video ref={videoRef} style={{width:"100%"}} controls/>
    )
}

// xhrSetup: function(xhr, url) { xhr.withCredentials = true; }