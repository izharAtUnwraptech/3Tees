import { proxy } from 'valtio';

const state = proxy({
    intro:true,
    create:false,
    front:false,
    back:false,
    color:'#2F2F2A',
    isLogoTexture:true,
    // fullTecture - pocket Logo Texture
    isFullTexture:true,
    isbackTexture:true,
    isSideTexture:false,
    // front center = logoDecal
    logoDecal:'./unwraptechLogo.png', 
    // front logo on chest = fullDecal
    fullDecal:'./utl.png',
    backDecal:'./utl.png',
    sideDecal:'./threejs.png',
    shirtMat:'./texture5Cloth2.jpg',
    // shirtMat:'./texture2Mat.jpg',
    camPos:[-0.4, 0, 2],
    logoDecalPos:[0,0.04, 0.15],
    logoScale:0.25,
    logoRotate:[0,0,0],
    fullDecalPos:[0.1,0.12, 0.1],
    fullScale:0.05,
    fullRotate:[0,0,0],
    backDecalPos:[0,0.15, -0.1],
    backScale:0.15,
    backRotate:[0,0,0],
    view:[0, 0, 0],
    isMale:false,
    isFemale:true,
    isCollored:false,
    isOversized:false,
    femLogoDecalPos:[0,0.04, 0.15],
    toDownload:false,
    downloadInProgress:false,
    isDropdownOpen:false,

    // model Data
    size:'M',
    frontImage:"",
    backImage:"",


    // Pricing
    finalPrice:0,

    
});

export default state; 