$version="Pre Alpha v0.1d";
$version_b="Build 2012072101";
$nowplay=0;
$now_lst_page=1;
$total_lst_page=1;
$now_lrc=-1;
$isstoped=1;
$play_auto_next=0;
$play_loop=0;
$play_vol=100;
$issilent=0;
$jumprate=10;
$drag_lastx=0;
$drag_firstx=0;
$drag_minmount=100;
$pllrc=Array({"t":"1","data":"Oplay"});
$thems_bg="#fff";
$tmer=0;
$nowpage=1;
$loadingover=0;
$plst_itemcount=20;
$screen_statue=4;
$isfullscreen=0;
$fftstyle=0;
$webkitloaded=1;
$baseurl="http://localhost/oplay_0.1_pre/index.html";
player_inti_a();
function player_inti_a(){
	console.log("Oplay-inti: Oplay-开放视界，聆听生活-"+$version+" "+$version_b);
	document.title="Oplay-开放视界，聆听生活-"+$version+" "+$version_b;
	if (!window.Audio || !('mozWriteAudio' in new Audio()) && !window.AudioContext && !window.webkitAudioContext) {
    	unsupported = true;
    	alert("不推荐的浏览器，请使用Firefox 13+(最佳体验),或chrome 16+(无波谱分析)");
		console.error("不推荐的浏览器，请使用Firefox 13+(最佳体验),或chrome 16+(无波谱分析)");
	}
	var mw=document.body.clientWidth;
	var aa=(mw+30)/2;
	document.getElementById('loading_1').style.left=(aa-30)+"px";
	document.getElementById('loading_2').style.left=(aa-10)+"px";
	document.getElementById('loading_3').style.left=(aa+10)+"px";
	document.getElementById('loading_4').style.left=(aa+30)+"px";
	//document.getElementById('loading_logo').style.left=(aa-100)+"px";
	//document.getElementById('loading_sta').style.left=(aa+40)+"px";
	//document.getElementById('loading_text').style.left=(aa-100)+"px";
	//document.getElementById('loading_cloud').style.left=(aa-690)+"px";
	document.getElementById('loading_img').style.left=(aa-150)+"px";
	document.getElementById('loading_img').style.top=(document.getElementById('loading_1').offsetTop-500)+"px";
	document.getElementById('loading').style.width=(mw+30)+"px";
	document.getElementById('loading').style.left="0px";
	document.getElementById('loading_img').className="loading_img_now";
	inti_styles();
	document.getElementById('loading_ver').innerHTML="Oplay | "+$version+" | | "+$version_b+" | Scientihark | |copyright 2012| |Fork me on Github|";
	player_inti_loading(1,1);
	window.onload=setTimeout(player_inti_b,3000);
	/*popschange=function (event) {
		if(event.state.action){
			player_play(event.state.action);
		}
	};
	window.addEventListener("popstate",popschange,false);*/
}
function player_inti_loading($ida,$idb){
	var $cgd=0;
	if($ida==5){
		$ida=1;
		$idb++;
		if($idb==2){
			$cgd=1;
		}
	}
	if($idb==3){
		$idb=0;
	}
	if($loadingover==0){
		var aa="player_inti_loading_do("+$ida+","+$idb+");";
		if($cgd==0){
			setTimeout(aa,300);
		}else{
			setTimeout(aa,1000);
		}
	}
}
function player_inti_loading_do($ida,$idb){
	var ta=Array("loading_none","loading_now","loading_over");
	document.getElementById('loading_'+$ida).className=ta[$idb];
	$ida++;
	player_inti_loading($ida,$idb);
}
function player_inti_b(){
	random_bg();
	setTimeout(player_inti_c,2000);
}
function player_inti_c(){
	document.getElementById('loading').style.left=-(document.body.clientWidth+30)+"px";
	setTimeout(player_inti_d,1000);
}
function player_inti_d(){
	$loadingover=1;
	if(!$playlist){
		console.error("error!无法找到播放列表，请确保$playlist在播放器初始化前加载!");
		return;
	}
	if($playlist['0']['c']==-1){
		autocontsrc();
	}
	$total_lst_page=getpagenum($playlist['0']['c'],$plst_itemcount);
	plst_makelst(1,$plst_itemcount);
	player_plays=function(){player_play(-2);};
	document.getElementById('header_con_p').addEventListener("click",player_plays,false);
	document.getElementById('header_con_pres').addEventListener("click",play_pre,false);
	document.getElementById('header_con_nexts').addEventListener("click",play_next,false);
	document.getElementById('header_subcon_loop').addEventListener("click",play_loop,false);
	document.getElementById('header_con_sound').addEventListener("click",play_silent,false);
	document.getElementById('header_subcon_lrc').addEventListener("click",player_showlrc,false);
	document.getElementById('header_subcon_lst').addEventListener("click",player_showlst,false);
	document.getElementById('header_subcon_skin').addEventListener("click",random_bg,false);
	document.getElementById('header_subcon_fullscreen').addEventListener("click",full_screen,false);
	document.addEventListener("fullscreenchange",full_screen_dect,false);
	document.addEventListener("mozfullscreenchange",full_screen_dect,false);
	document.addEventListener("webkitfullscreenchange",full_screen_dect,false);
	window.addEventListener("resize",inti_styles,false);
	//document.getElementById('progress-bar-gradient-clicker').addEventListener("click",player_pro_click,false);
	//document.getElementById('progress-bar-gradient-clicker2').addEventListener("click",player_vol_click,false);
	//document.getElementById('player_list_btn').addEventListener("click",play_showlist,false);
	check_plst_btns();
	var player=document.getElementById('player');
	$('#header_con_proces_mask').slider({
		step:0.1,
		slide: function(event, ui) {
		play_goto(parseInt(player.duration* ui.value / 100));
		},
		stop: function(event, ui) {
		play_goto(parseInt(player.duration* ui.value / 100));
		} 
	});
	$('#header_con_sound_bar_mask').slider({
		step:0.1,
		slide: function(event, ui) {
		$vol=parseInt(ui.value);
		player_set_vol($vol);
		},
		stop: function(event, ui) {
		$vol=parseInt(ui.value);
		player_set_vol($vol);
		} 
	});
	player_set_vol(100);
	$tepa=window.location;
	$tepa=String($tepa).split("?");
	if($tepa[1]){
		$tepa=String($tepa[1]).split("|:|");
		player_play($tepa[0]);
	}else{
		setTimeout(check_autoplay,2000);
	}
	
	
}
function full_screen_dect(){
	$isfullscreen=0;
	document.getElementById('header_subcon_fullscreen').innerHTML="全屏";
	if (document.fullscreen){  
        	$isfullscreen=1;
			document.getElementById('header_subcon_fullscreen').innerHTML="恢复";
    }else if(document.mozFullScreen){  
        	$isfullscreen=1;
			document.getElementById('header_subcon_fullscreen').innerHTML="恢复";
    }else if(document.webkitIsFullScreen){  
        	$isfullscreen=1;
			document.getElementById('header_subcon_fullscreen').innerHTML="恢复";
    }
}
function full_screen(){
	var docElm = document.documentElement;  
	if($isfullscreen==0){
    	if (docElm.requestFullscreen) {  
        	docElm.requestFullscreen();  
    	}else if (docElm.mozRequestFullScreen) {  
        	docElm.mozRequestFullScreen();  
   		}else if (docElm.webkitRequestFullScreen) {  
    	    docElm.webkitRequestFullScreen();  
    	} 
	}else{
		if (document.exitFullscreen) {  
       		document.exitFullscreen();  
    	}else if (document.mozCancelFullScreen) {  
     	   document.mozCancelFullScreen();  
    	}else if (document.webkitCancelFullScreen) {  
    	    document.webkitCancelFullScreen();  
    	}  
	}
}
function autocontsrc(){
	var $i=1;
	while($playlist[$i]&&$playlist[$i]['src']){
		$i++;
	}
	$playlist['0']['c']=$i-1;
}
function plst_lst_gopage(ipt){
	check_plst_pre_fout(document.getElementById('player_list_pre'));
	check_plst_next_fout(document.getElementById('player_list_next'));
	var deta=ipt-$now_lst_page;
	if(deta>0){
		if($now_lst_page+deta<=$total_lst_page){
			$now_lst_page=$now_lst_page+deta;
			plst_lst_fadeout(1);
			var aa="plst_makelst("+(($now_lst_page-1)*$plst_itemcount+1)+","+($now_lst_page*$plst_itemcount+1)+")";
			setTimeout(aa,2200);
		}
	}else if(deta<0){
		if($now_lst_page+deta>=1){
			$now_lst_page=$now_lst_page+deta;
			plst_lst_fadeout(1);
			var aa="plst_makelst("+(($now_lst_page-1)*$plst_itemcount+1)+","+($now_lst_page*$plst_itemcount+1)+")";
			setTimeout(aa,2200);
		}
	}
	setTimeout(check_plst_btns,1000);
}
function plst_lst_gonext(){
	plst_lst_gopage($now_lst_page+1);
}
function plst_lst_gopre(){
	plst_lst_gopage($now_lst_page-1);
}
function getpagenum(ipt,bpt){
	var opt=ipt/bpt
	var opt2=parseInt(opt);
	if(opt2*bpt<ipt){
		return opt2+1;
	}
	return opt2;
}
function check_plst_pre_fout(a_p){
	a_p.removeEventListener("click",plst_lst_gopre,false);
	a_p.className="player_list_pre_none";
}
function check_plst_pre_fin(a_p){
	a_p.addEventListener("click",plst_lst_gopre,false);
	a_p.className="player_list_pre_now";
}
function check_plst_next_fin(a_n){
	a_n.addEventListener("click",plst_lst_gonext,false);
	a_n.className="player_list_next_now";
}
function check_plst_next_fout(a_n){
	a_n.removeEventListener("click",plst_lst_gonext,false);
	a_n.className="player_list_next_none";
}
function check_plst_btns(){
	var a_p=document.getElementById('player_list_pre');
	var a_n=document.getElementById('player_list_next');
	if(($now_lst_page-1)<=0){
		check_plst_pre_fout(a_p);
	}else{
		check_plst_pre_fin(a_p);
	}
	if(($now_lst_page+1)>$total_lst_page){
		check_plst_next_fout(a_n);
	}else{
		check_plst_next_fin(a_n);
	}
}
function check_autoplay(){
	$play_auto_next=$playlist['0']['autonext'];
	if($playlist['0']['autoplay']==0){
		return;
	}else if($playlist['0']['autoplay']==-1){
		var $radomnum=rand(1,$playlist['0']['c']);
		player_play($radomnum);
		return;
	}else{
		player_play($playlist['0']['autoplay']);
		return;
	}
}
function plst_makelst(start,end){
	var $i=1,$j=1;
	var $output="";
	var $count=$playlist['0']['c'];
	for($i=start;$i<=end;$i++,$j++){
		if($output!=""){$output=$output+"\n";}
		if($i<=$count){var ca=$playlist[$i]['t']}else{var ca="";}
		$output=$output+"\n<section id=\"pl_"+$j+"\" onclick=\"player_play("+$i+");\" class=\"noneplay\">"+ca+"</section>";
	}
	document.getElementById('player_list').innerHTML=$output;
	setTimeout("plst_lst_fadein(1);",100);
}
function plst_lst_fadein(id){
	if(id>$plst_itemcount){return;}
	if(document.getElementById('pl_'+id).innerHTML!=""){
		document.getElementById('pl_'+id).className="noneplay2";
		if(($nowplay==(id+($now_lst_page-1)*$plst_itemcount))&&($now_lst_page==getpagenum($nowplay,$plst_itemcount))){
			var tt="document.getElementById('pl_"+id+"').className=\"nowplay\";";
		}else{
			var tt="document.getElementById('pl_"+id+"').className=\"noplay\";";
		}
		setTimeout(tt,500);
	}
	var aa="plst_lst_fadein("+(id+1)+");";
	setTimeout(aa,100);
}

function plst_lst_fadeout(id){
	if(id>$plst_itemcount){return;}
	if(document.getElementById('pl_'+id)){
		document.getElementById('pl_'+id).className="noneplay";
	}
	var aa="plst_lst_fadeout("+(id+1)+");";
	setTimeout(aa,100);
}
function player_album_pic(ipt){
	var $i=1;
	for($i=1;$i<6;$i++){
		document.getElementById('al_pic_'+$i).className="al_pic_"+$i+"_"+ipt;
	}
}
function load_album_pic(id){
	random_bg();
	player_album_pic("none");
	if($audio_info["pic"]!="NULL"){
		$opt="<img src=\""+$audio_info["pic"]+"\" width=\"76\" height=\"76\">";
	}else if($playlist[id]['p']){
		$opt="<img src=\""+$playlist[id]['p']+"\" width=\"76\" height=\"76\">";
	}else{
		$opt="<section>\n<a>O</a>play\n</section>\n<section id=\"al_pic_6\">\n开放视界，\n</section>\n<section id=\"al_pic_7\">\n聆听生活\n</section>";
	}
	document.getElementById('al_pic_1').innerHTML=$opt;
	var tt="player_album_pic(\"now\");";
	setTimeout(tt,1000);
	document.getElementById('al_bg').className="al_bg_none";
	if($playlist[id]['bg']){
		$opt="url('"+$playlist[id]['bg']+"')";
	}else{
		$opt="none";
	}
	document.getElementById('al_bg').style.backgroundImage=$opt;
	var tt="document.getElementById('al_bg').className=\"al_bg_now\";";
	setTimeout(tt,1000);
}
function inti_styles(){
	var mw=document.body.clientWidth;
	console.log("窗体初始化/Resize:  当前窗体宽度："+mw);
	document.getElementById('bodys').style.width=(mw+100)*2+"px";
	document.getElementById('lsts').style.width=(mw+30)+"px";
	document.getElementById('lrcs').style.left=(mw+30)+"px";
	document.getElementById('fft').style.left=(((mw+30)/2)-256)+"px";
	document.getElementById('fft2').style.left=(((mw+30)/2)-256)+"px";
	document.getElementById('lrcs').style.width=(mw+30)+"px";
	document.getElementById('al_bg').style.width=(mw+30)+"px";
	var ta=(((mw+30)/2)-(mw+30)*0.45)+"px";
	$(".lrc_1").css('left',ta);
	$(".lrc_2").css('left',ta);
	$(".lrc_3").css('left',ta);
	$(".lrc_4").css('left',ta);
	$(".lrc_5").css('left',ta);
	$(".lrc_6").css('left',ta);
	document.getElementById('player_list').style.left=(((mw+30)/2)-(mw+30)*0.3)+"px";
	var $cged=$screen_statue;
	if(mw<=300){
		$plst_itemcount=5;
		$screen_statue=0;
		document.getElementById('header_con_pres').style.display="none";
		document.getElementById('header_con_pre').style.display="none";
		document.getElementById('header_con_next').style.display="none";
		document.getElementById('fft').style.display="none";
		document.getElementById('fft2').style.display="none";
		document.getElementById('header_subcon_lst').style.width="50px";
		document.getElementById('header_subcon_lrc').style.width="50px";
		document.getElementById('header_subcon_lst').style.fontSize="0.8em";
		document.getElementById('header_subcon_lrc').style.fontSize="0.8em";
		document.getElementById('header_subcon_lst').style.left="10px";
		document.getElementById('header_subcon_lrc').style.left="60px";
		document.getElementById('header_subcon_lst').style.height="15px";
		document.getElementById('header_subcon_lrc').style.height="15px";
		document.getElementById('header_subcon_lst').style.top="100px";
		document.getElementById('header_subcon_lrc').style.top="100px";
		document.getElementById('header_subcon_lst').innerHTML="列表";
		document.getElementById('header_subcon_lrc').innerHTML="歌词";
		document.getElementById('player_list').style.fontSize="0.8em";
		document.getElementById('header_con_p').style.left="0px";
		document.getElementById('header_con_pres').style.left="0px";
		document.getElementById('header_con_nexts').style.left="0px";
		document.getElementById('player_list_pre').style.left="40px";
		document.getElementById('player_list_next').style.right="40px";
		document.getElementById('header_info_name').style.fontSize="0.7em";
		document.getElementById('header_info_al').style.fontSize="0.55em";
		document.getElementById('header_info_singer').style.fontSize="0.55em";
		document.getElementById('header_info_rate').style.fontSize="0.55em";
		document.getElementById('header_info_chanel').style.fontSize="0.55em";
		document.getElementById('header_info_frameb').style.fontSize="0.55em";
		document.getElementById('header_con_soundctn').style.display="none";
		document.getElementById('header_subcon').style.display="none";
		document.getElementById('player_list_pre').style.fontSize="1.2em";
		document.getElementById('player_list_next').style.fontSize="1.2em";
		document.getElementById('loading_ver').style.fontSize="0.5em";
	}else if(mw<=480){
		$plst_itemcount=10;
		$screen_statue=1;
		document.getElementById('header_con_pres').style.display="inline-block";
		document.getElementById('header_con_pre').style.display="none";
		document.getElementById('header_con_next').style.display="none";
		document.getElementById('fft').style.display="inline-block";
		document.getElementById('fft2').style.display="inline-block";
		document.getElementById('header_subcon_lst').style.width="50px";
		document.getElementById('header_subcon_lrc').style.width="50px";
		document.getElementById('header_subcon_lst').style.fontSize="0.8em";
		document.getElementById('header_subcon_lrc').style.fontSize="0.8em";
		document.getElementById('header_subcon_lst').style.left="10px";
		document.getElementById('header_subcon_lrc').style.left="60px";
		document.getElementById('header_subcon_lst').style.height="15px";
		document.getElementById('header_subcon_lrc').style.height="15px";
		document.getElementById('header_subcon_lst').style.top="100px";
		document.getElementById('header_subcon_lrc').style.top="100px";
		document.getElementById('header_subcon_lst').innerHTML="列表";
		document.getElementById('header_subcon_lrc').innerHTML="歌词";
		document.getElementById('player_list').style.fontSize="0.8em";
		document.getElementById('header_con_p').style.left="0px";
		document.getElementById('header_con_pres').style.left="0px";
		document.getElementById('header_con_nexts').style.left="0px";
		document.getElementById('player_list_pre').style.left="40px";
		document.getElementById('player_list_next').style.right="40px";
		document.getElementById('header_info_name').style.fontSize="0.85em";
		document.getElementById('header_info_al').style.fontSize="0.75em";
		document.getElementById('header_info_singer').style.fontSize="0.75em";
		document.getElementById('header_info_rate').style.fontSize="0.75em";
		document.getElementById('header_info_chanel').style.fontSize="0.75em";
		document.getElementById('header_info_frameb').style.fontSize="0.75em";
		document.getElementById('header_con_soundctn').style.display="none";
		document.getElementById('header_subcon').style.display="none";
		document.getElementById('player_list_pre').style.fontSize="1.5em";
		document.getElementById('player_list_next').style.fontSize="1.5em";
		document.getElementById('loading_ver').style.fontSize="0.5em";
	}else if(mw<=600){
		$plst_itemcount=12;
		$screen_statue=2;
		document.getElementById('header_con_pres').style.display="inline-block";
		document.getElementById('header_con_pre').style.display="none";
		document.getElementById('header_con_next').style.display="none";
		document.getElementById('fft').style.display="inline-block";
		document.getElementById('fft2').style.display="inline-block";
		document.getElementById('header_subcon_lst').style.width="50px";
		document.getElementById('header_subcon_lrc').style.width="50px";
		document.getElementById('header_subcon_lst').style.fontSize="0.8em";
		document.getElementById('header_subcon_lrc').style.fontSize="0.8em";
		document.getElementById('header_subcon_lst').style.left="10px";
		document.getElementById('header_subcon_lrc').style.left="60px";
		document.getElementById('header_subcon_lst').style.height="15px";
		document.getElementById('header_subcon_lrc').style.height="15px";
		document.getElementById('header_subcon_lst').style.top="100px";
		document.getElementById('header_subcon_lrc').style.top="100px";
		document.getElementById('header_subcon_lst').innerHTML="列表";
		document.getElementById('header_subcon_lrc').innerHTML="歌词";
		document.getElementById('player_list').style.fontSize="0.8em";
		document.getElementById('header_con_p').style.left="5px";
		document.getElementById('header_con_pres').style.left="5px";
		document.getElementById('header_con_nexts').style.left="5px";
		document.getElementById('player_list_pre').style.left="50px";
		document.getElementById('player_list_next').style.right="50px";
		document.getElementById('header_info_name').style.fontSize="1.6em";
		document.getElementById('header_info_al').style.fontSize="0.98em";
		document.getElementById('header_info_singer').style.fontSize="0.8em";
		document.getElementById('header_info_rate').style.fontSize="0.8em";
		document.getElementById('header_info_chanel').style.fontSize="0.8em";
		document.getElementById('header_info_frameb').style.fontSize="0.8em";
		document.getElementById('header_con_soundctn').style.display="none";
		document.getElementById('header_subcon').style.display="none";
		document.getElementById('player_list_pre').style.fontSize="2em";
		document.getElementById('player_list_next').style.fontSize="2em";
		document.getElementById('loading_ver').style.fontSize="0.7em";
	}else if(mw<=1000){
		$plst_itemcount=20;
		$screen_statue=3;
		document.getElementById('header_con_pres').style.display="inline-block";
		document.getElementById('header_con_pre').style.display="none";
		document.getElementById('header_con_next').style.display="none";
		document.getElementById('fft').style.display="inline-block";
		document.getElementById('fft2').style.display="inline-block";
		document.getElementById('header_subcon_lst').style.width="60px";
		document.getElementById('header_subcon_lrc').style.width="60px";
		document.getElementById('header_subcon_lst').style.fontSize="0.8em";
		document.getElementById('header_subcon_lrc').style.fontSize="0.8em";
		document.getElementById('header_subcon_lst').style.left="260px";
		document.getElementById('header_subcon_lrc').style.left="320px";
		document.getElementById('header_subcon_lst').style.height="20px";
		document.getElementById('header_subcon_lrc').style.height="20px";
		document.getElementById('header_subcon_lst').style.top="95px";
		document.getElementById('header_subcon_lrc').style.top="95px";
		document.getElementById('header_subcon_lst').innerHTML="列表";
		document.getElementById('header_subcon_lrc').innerHTML="歌词";
		document.getElementById('player_list').style.fontSize="1em";
		document.getElementById('header_con_p').style.left="5px";
		document.getElementById('header_con_pres').style.left="5px";
		document.getElementById('header_con_nexts').style.left="5px";
		document.getElementById('header_info_name').style.fontSize="1.6em";
		document.getElementById('header_info_al').style.fontSize="0.8em";
		document.getElementById('header_info_singer').style.fontSize="0.8em";
		document.getElementById('header_info_rate').style.fontSize="0.8em";
		document.getElementById('header_info_chanel').style.fontSize="0.8em";
		document.getElementById('header_info_frameb').style.fontSize="0.8em";
		document.getElementById('header_con_soundctn').style.display="inline-block";
		document.getElementById('header_subcon').style.display="inline-block";
		document.getElementById('player_list_pre').style.fontSize="4em";
		document.getElementById('player_list_next').style.fontSize="4em";
		document.getElementById('loading_ver').style.fontSize="0.7em";
	}else{
		$plst_itemcount=20;
		$screen_statue=4;
		document.getElementById('header_con_pres').style.display="inline-block";
		document.getElementById('header_con_pre').style.display="inline-block";
		document.getElementById('header_con_next').style.display="inline-block";
		document.getElementById('fft').style.display="inline-block";
		document.getElementById('fft2').style.display="inline-block";
		document.getElementById('header_subcon_lst').style.width="100px";
		document.getElementById('header_subcon_lrc').style.width="100px";
		document.getElementById('header_subcon_lst').style.fontSize="1em";
		document.getElementById('header_subcon_lrc').style.fontSize="1em";
		document.getElementById('header_subcon_lst').style.left="260px";
		document.getElementById('header_subcon_lrc').style.left="360px";
		document.getElementById('header_subcon_lst').style.height="20px";
		document.getElementById('header_subcon_lrc').style.height="20px";
		document.getElementById('header_subcon_lst').style.top="95px";
		document.getElementById('header_subcon_lrc').style.top="95px";
		document.getElementById('header_subcon_lst').innerHTML="播放列表";
		document.getElementById('header_subcon_lrc').innerHTML="歌词秀";
		document.getElementById('player_list').style.fontSize="1em";
		document.getElementById('header_con_p').style.left="5px";
		document.getElementById('header_con_pres').style.left="5px";
		document.getElementById('header_con_nexts').style.left="5px";
		document.getElementById('header_info_name').style.fontSize="1.6em";
		document.getElementById('header_info_al').style.fontSize="0.8em";
		document.getElementById('header_info_singer').style.fontSize="0.8em";
		document.getElementById('header_info_rate').style.fontSize="0.8em";
		document.getElementById('header_info_chanel').style.fontSize="0.8em";
		document.getElementById('header_info_frameb').style.fontSize="0.8em";
		document.getElementById('header_con_soundctn').style.display="inline-block";
		document.getElementById('header_subcon').style.display="inline-block";
		document.getElementById('player_list_pre').style.fontSize="4em";
		document.getElementById('player_list_next').style.fontSize="4em";
		document.getElementById('loading_ver').style.fontSize="0.8em";
	}
	if(($loadingover==1)&&($cged!=$screen_statue)){
		$total_lst_page=getpagenum($playlist['0']['c'],$plst_itemcount);
		$now_lst_page=0;
		plst_makelst(1,$plst_itemcount);
		check_plst_btns();
	}
}
function inti_style(thems_bg){
	document.getElementById('header').style.backgroundColor=thems_bg;
	document.getElementById('header_con_proces_fill').style.backgroundColor=thems_bg;
	document.getElementById('header_con_sound_bar_fill').style.backgroundColor=thems_bg;
	document.getElementById('header_al_pic').style.backgroundColor="#000";
	document.getElementById('header_con').style.backgroundColor="#000";
	document.getElementById('bodys').style.backgroundColor=thems_bg;
	if($nowpage==2){player_showlrc();}
	document.getElementById('header_subcon_lrc').style.backgroundColor="#000";
	document.getElementById('header_subcon_lst').style.backgroundColor=$thems_bg;
}
function random_bg(){
	var ta=Array("#930093","#930093","#930093","#930093","#930093","#320442","#E5A01F","#9BB635","#51B2B9","#064F93","#692FA0","#D04C40","#0C753D","#BF2040","#00BCE1","#044889","#014051","#867C84","#69630D","#CE671A","#5435AE");
	var $radomnum=rand(0,20);
	$thems_bg=ta[$radomnum];
	inti_style($thems_bg);
}
function player_play(id){
	var player=document.getElementById('player');
	if(id==-2){
		if(player.paused){
			player.play();
			document.getElementById('header_con_p').className="header_con_p_pause";
			return;
		}
		if($isstoped!=1){
			player.pause();
			document.getElementById('header_con_p').className="header_con_p_play";
			return;
		}
	}
	if(id==$nowplay){
		return;
	}
	if(!$playlist[id]||!$playlist[id]['src']||$playlist[id]['src']==""){
		alert("error!无法找到文件!"+id);
		return;
	}
	player_album_pic("none");
	var acc="document.getElementById('pl_'+"+(parseInt(id-(getpagenum(id,$plst_itemcount)-1)*$plst_itemcount))+").className=\"nowplay\";";
	var nowurl=$playlist[id]['src'];
	var pgn=getpagenum(id,$plst_itemcount);
	if(($nowplay!=0)&&($now_lst_page==getpagenum($nowplay,$plst_itemcount))){
		document.getElementById('pl_'+(parseInt($nowplay-(getpagenum($nowplay,$plst_itemcount)-1)*$plst_itemcount))).className="noplay";
	}
	if(pgn!=$now_lst_page){
		plst_lst_gopage(pgn);
	}else{
		setTimeout(acc,500);
	}
	$nowplay=id;
	document.getElementById('header_info_name').innerHTML=$playlist[id]['t'];
	document.getElementById('header_con_p').className="header_con_p_pause";
	player.addEventListener("timeupdate",player_times,false);
	player.src=nowurl;
	get_audio_info(nowurl,id);
	clearfft();
	player.load();
	document.getElementById('header_info_al').innerHTML="未知专辑";
	document.getElementById('header_info_singer').innerHTML="未知歌手";
	document.getElementById('header_info_gen').innerHTML="未知流派";
	document.getElementById('header_info_rate').innerHTML="";
	document.getElementById('header_info_chanel').innerHTML="";
	var tt="正在播放-"+$playlist[id]['t']+" -Oplay";
	var $state={
		tittle:tt+"-开放视界，聆听生活-"+$version+" "+$version_b,
		url:$baseurl+"?"+id+"|:|"+$playlist[id]['t'],
		action:id
	}
	history.pushState($state,$state['tittle'],$state['url']);
	document.title=$state['tittle'];
	console.log(tt);
	 if(window.webkitAudioContext&&$webkitloaded==0){
		//  window.addEventListener('load', webkitreadaudio, false);
		  webkitreadaudio();
		  $webkitloaded=1;
	 }
	var goplay=function(){player.play();play_goto(0);};
	var caat=read_lrc(id);
	if(caat==1||caat==-1){
		$now_lrc=-1;
		setTimeout(goplay,3000);
		//player.play();
		$isstoped=0;
		$ispaused=0;
	}
	
}
function get_audio_info(url,id){
	var ta=url.split(".");
	if(ta[1]){
		if(ta[1]=="mp3"){
			var tb=ta;
		}else{
			var tb=ta[0]+".mp3";
		}
	}
	
	 $audio_file=tb;
	 read_audio_info();
	 setTimeout(get_audio_info_do,3000);
	 var aa="load_album_pic("+id+")";
	setTimeout(aa,1000);
}
function get_audio_info_do(){
	 if(($audio_info["album"]!="NULL")&&document.getElementById('header_info_al').innerHTML=="未知专辑"){
		 document.getElementById('header_info_al').innerHTML=$audio_info["album"];
	 }
	 if(($audio_info["artist"]!="NULL"&&document.getElementById('header_info_singer').innerHTML=="未知歌手")){
		 document.getElementById('header_info_singer').innerHTML=$audio_info["artist"];
	 }
	  if(($audio_info["genre"]!="NULL"&&document.getElementById('header_info_gen').innerHTML=="未知流派")){
		 document.getElementById('header_info_gen').innerHTML=$audio_info["genre"];
	 }
}
function player_times(){
	$tmer++;
	var player=document.getElementById('player');
	var pro_a=document.getElementById('header_con_proces_fill');
	var timedis=document.getElementById('player_time');
	var nowtime=Math.floor(player.currentTime);
	var fulltime=Math.floor(player.duration);
	var pl_min_now=parseInt(nowtime/60);
	var pl_s_now=parseInt(nowtime%60);
	var pl_min_full=parseInt(fulltime/60);
	var pl_s_full=parseInt(fulltime%60);
	timedis.innerHTML="<table id=\"player_times\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tr>\n<td>"+get_with_0_str(pl_min_now,10)+"</td>\n<td>:</td>\n<td>"+get_with_0_str(pl_s_now,10)+"</td>\n<td>/</td>\n<td>"+get_with_0_str(pl_min_full,10)+"</td>\n<td>:</td>\n<td>"+get_with_0_str(pl_s_full,10)+"</td>\n</tr>\n</table>";
	//var tempt="["+pl_min_now+":"+pl_s_now+"]";
	var percentn=nowtime/fulltime;
	var tt=document.getElementById('header_con_proces_bar').offsetWidth;
	var noww=parseInt((percentn*tt));
	pro_a.style.width=noww+"px";
	var noet2=roundFun(player.currentTime,2);
	show_lrc(noet2);
	if(nowtime<=10){
		document.getElementById('header_con_pre').className="header_pre_none";
		document.getElementById('header_con_pre').removeEventListener("click",jump_pre,false);
	}else{
		document.getElementById('header_con_pre').className="header_pre_now";
		document.getElementById('header_con_pre').addEventListener("click",jump_pre,false);
	}
	if(nowtime>=fulltime-10){
		document.getElementById('header_con_next').className="header_next_none";
		document.getElementById('header_con_next').removeEventListener("click",jump_next,false);
	}else{
		document.getElementById('header_con_next').className="header_next_now";
		document.getElementById('header_con_next').addEventListener("click",jump_next,false);
	}
	if(nowtime==fulltime){
		player_album_pic("none");
		if($play_loop==0){//无循环
			if($nowplay!=$playlist['0']['c']){
				play_next();
			}
			return;
		}
		if($play_loop==1){//单曲循环
			var tempa=$nowplay;
			$nowplay=0;
			player_play(tempa);
			return;
		}
		if($play_loop==2){//随机循环
			var $radomnum=rand(1,$playlist['0']['c']);
			for(;;){
				if($radomnum!=$nowplay){
					break;
				}else{
					$radomnum=rand(1,$playlist['0']['c']);
				}
			}
			player_play($radomnum);
			return;
		}
		if($play_auto_next!=0){
			play_next();
			return;
		}
	}
}
function get_with_0_str($input,$wantedwei){
	var $iii=0;
	var $iij=0;
	if($input==0){
		return "00";
	}
	for($iii=0;$iii<10000;$iii++){
		var $tp=parseInt($input);
		for($iij=0;$iij<$iii;$iij++){
			$tp=$tp*10;
		}
		if($tp>($wantedwei-1)){
			break;
		}
	}
	var $ji=0;
	for($ji=0;$ji<$iii;$ji++){
		$input="0"+$input;
	}
	return $input;
}
function read_lrc($fid){
	if(!$playlist[$nowplay]||!$playlist[$nowplay]['lrc']){
		document.getElementById('lrcs_1').className="lrc_1";
		document.getElementById('lrcs_2').className="lrc_2";
		document.getElementById('lrcs_3').className="lrc_3";
		document.getElementById('lrcs_4').className="lrc_4";
		document.getElementById('lrcs_5').className="lrc_5";
		document.getElementById('lrcs_6').className="lrc_6";
		document.getElementById('lrcs_1').innerHTML="";
		document.getElementById('lrcs_2').innerHTML="";
		document.getElementById('lrcs_3').innerHTML="Oplay 开放视界，聆听生活";
		document.getElementById('lrcs_4').innerHTML="无歌词";
		document.getElementById('lrcs_5').innerHTML=$version+" "+$version_b;
		document.getElementById('lrcs_6').innerHTML="";
		return -1;
	}
	var nowurl=$playlist[$fid]['lrc'];
	//LoadJS('p_lrc',nowurl); 
	loadLrc(nowurl);
	var $i=0;
	$pllrc=0;
	document.getElementById('lrcs_1').innerHTML="";
	document.getElementById('lrcs_2').innerHTML="";
	document.getElementById('lrcs_3').innerHTML="";
	document.getElementById('lrcs_4').innerHTML="歌词加载中~~";
	document.getElementById('lrcs_5').innerHTML="";
	document.getElementById('lrcs_6').innerHTML="";
	document.getElementById('lrcs_1').className="lrc_1";
	document.getElementById('lrcs_2').className="lrc_2";
	document.getElementById('lrcs_3').className="lrc_3";
	document.getElementById('lrcs_4').className="lrc_4";
	document.getElementById('lrcs_5').className="lrc_5";
	document.getElementById('lrcs_6').className="lrc_6";
	return 1;
}
function show_lrc($t){
	if(!$playlist[$nowplay]||!$playlist[$nowplay]['lrc']){
		return 0;
	}
	if($pllrc[$now_lrc+1]&&$pllrc[$now_lrc+1]['t']&&$t>=$pllrc[$now_lrc+1]['t']){
		$now_lrc++;
		lrcgo();
	}
}
function lrcgo(){
	if($now_lrc==0){
		document.getElementById('lrcs_1').innerHTML="";
		document.getElementById('lrcs_2').innerHTML="";
		document.getElementById('lrcs_3').innerHTML="";
		document.getElementById('lrcs_4').innerHTML=$pllrc[0]['data'];
		document.getElementById('lrcs_5').innerHTML=$pllrc[1]['data'];
		document.getElementById('lrcs_6').innerHTML=$pllrc[2]['data'];
	}else{
	var tempa=document.getElementById('lrcs_6').className;
	document.getElementById('lrcs_6').className=document.getElementById('lrcs_5').className;
	document.getElementById('lrcs_5').className=document.getElementById('lrcs_4').className;
	document.getElementById('lrcs_4').className=document.getElementById('lrcs_3').className;
	document.getElementById('lrcs_3').className=document.getElementById('lrcs_2').className;
	document.getElementById('lrcs_2').className=document.getElementById('lrcs_1').className;
	document.getElementById('lrcs_1').className=tempa;
		if($pllrc[$now_lrc+2]&&$pllrc[$now_lrc+2]['data']){
			document.getElementsByClassName('lrc_6')[0].innerHTML=$pllrc[$now_lrc+2]['data'];
		}else{
			document.getElementsByClassName('lrc_6')[0].innerHTML="";
		}
	}
	$output="";
	for(var $i=1;$i<7;$i++){
		$output=$output+"<br>lrcs_"+$i+":   "+document.getElementById('lrcs_'+$i).className+"   "+document.getElementById('lrcs_'+$i).innerHTML;
	}
}
function LoadJS( iid, fileUrl )

{

   var scriptTag = document.getElementById( iid );

    var oHead = document.getElementsByTagName("HEAD").item(0);

   var oScript= document.createElement("script");



   if ( scriptTag   ) oHead.removeChild( scriptTag   );

     oScript.id = iid;

    oScript.type = "text/javascript";

     oScript.src=fileUrl ;

    oHead.appendChild( oScript);

}
function jump_pre(){
	var player=document.getElementById('player');
	var deta=player.currentTime-$jumprate;
	play_goto(parseInt(deta));
}
function jump_next(){
	var player=document.getElementById('player');
	var deta=player.currentTime+$jumprate;
	play_goto(parseInt(deta));
}
function play_next(){
	var $jid=1;
	if($nowplay!=$playlist['0']['c']){
		$jid=$nowplay-1+2;
	}
	player_play($jid);
}
function play_pre(){
	var $jid=$playlist['0']['c'];
	if($nowplay!=1){
		$jid=$nowplay-1;
	}
	player_play($jid);
}
function play_loop(){
	var tempa=document.getElementById('header_subcon_loop');
	if($play_loop==0){
		$play_loop=1;
		tempa.className="header_loop_single";
	}else if($play_loop==1){
		$play_loop=2;
		tempa.className="header_loop_random";
	}else if($play_loop==2){
		$play_loop=3;
		tempa.className="header_loop_lst";
	}else{
		$play_loop=0;
		tempa.className="header_loop_none";
	}
}
function play_goto($sec){
	var player=document.getElementById('player');
	if(!player||!player.currentTime){
		return;
	}
	if($sec>player.duration){
		alert("error play_goto($sec)  "+$sec+">"+player.duration);
		return;
	}
	player.currentTime=$sec;
	var $i=0;
	if($pllrc[0]&&$pllrc[0]['t']){
		if($sec<$pllrc[0]['t']){
			play_lrcgo(0);
			return;
		}
		for($i=0;;$i++){
			if($pllrc[$i]&&$pllrc[$i]['t']){
				if($pllrc[$i+1]&&$pllrc[$i+1]['t']){
					var $j=$i+1;
					if(($sec>=$pllrc[$i]['t'])&&($sec<=$pllrc[$j]['t'])){
						play_lrcgo($i);
						return;
					}
				}else{
						play_lrcgo($i);
						return;
				}
			}else{
				alert("error lrc");
				return;
			}
		}
	}
}
function play_lrcgo($ii){
	//alert($ii);
	if(!$playlist[$nowplay]||!$playlist[$nowplay]['lrc']){
		document.getElementById('lrcs_1').className="lrc_1";
		document.getElementById('lrcs_2').className="lrc_2";
		document.getElementById('lrcs_3').className="lrc_3";
		document.getElementById('lrcs_4').className="lrc_4";
		document.getElementById('lrcs_5').className="lrc_5";
		document.getElementById('lrcs_6').className="lrc_6";
		document.getElementById('lrcs_1').innerHTML="";
		document.getElementById('lrcs_2').innerHTML="";
		document.getElementById('lrcs_3').innerHTML="Oplay 开放视界，聆听生活";
		document.getElementById('lrcs_4').innerHTML="无歌词";
		document.getElementById('lrcs_5').innerHTML=$version+" "+$version_b;
		document.getElementById('lrcs_6').innerHTML="";
		return -1;
	}
	var $i=0;
	var $j=1;
	document.getElementById('lrcs_1').innerHTML="";
	document.getElementById('lrcs_2').innerHTML="";
	document.getElementById('lrcs_3').innerHTML="";
	document.getElementById('lrcs_4').innerHTML="";
	document.getElementById('lrcs_5').innerHTML="";
	document.getElementById('lrcs_6').innerHTML="";
	document.getElementById('lrcs_1').className="lrc_1";
	document.getElementById('lrcs_2').className="lrc_2";
	document.getElementById('lrcs_3').className="lrc_3";
	document.getElementById('lrcs_4').className="lrc_4";
	document.getElementById('lrcs_5').className="lrc_5";
	document.getElementById('lrcs_6').className="lrc_6";
	$now_lrc=$ii-1;
	for($i=$ii-3;$i<$ii+3;$i++){
		if($pllrc[$i]&&$pllrc[$i]['data']){
			document.getElementById('lrcs_'+$j).innerHTML=$pllrc[$i]['data'];
		}
		$j++;
	}
	$now_lrc=$ii;
}
function player_set_vol($vol){
	if($vol>100||$vol<-1){
		return;
	}
	var player=document.getElementById('player');
	var pro_a=document.getElementById('header_con_sound_bar_fill');
	if($vol==-1){
		player.volume=0;
		return;
	}
	if($issilent==1){
		return;
	}
	if($vol==0){
		player.volume=0;
		$play_vol=0;
	}else{
		player.volume=$vol/100;
		$play_vol=$vol;
	}
	pro_a.style.width=$vol+"px";
}
function play_silent(){
	if($nowpage==1){
		var ta=$thems_bg;
	}else{
		var ta="#fff";
	}
	var tempa=document.getElementById('header_con_sound');
	if($issilent==0){
		$issilent=1;
		tempa.className="header_sound_off";
		player_set_vol(-1);
		document.getElementById('header_con_sound_bar_fill').style.backgroundColor="#666";
	}else{
		$issilent=0;
		tempa.className="header_sound_on";
		player_set_vol($play_vol);
		document.getElementById('header_con_sound_bar_fill').style.backgroundColor=ta;
	}
}	/*
function player_pro_click(e){
	var player=document.getElementById('player');
	var Process = document.getElementById('progress-bar-gradient-clicker').offsetLeft;
	var ProcessLength = 300;
	var CurrentProces = e.clientX - Process;
	var $sec=parseInt((CurrentProces/ProcessLength)*Math.floor(player.duration));
	play_goto($sec);
}
function player_vol_click(e){
	var Process = document.getElementById('progress-bar-gradient-clicker2').offsetLeft;
	var CurrentProces = e.clientX - Process;
	var $vol=parseInt((CurrentProces));
	player_set_vol($vol);
}*/
function play_showlist(){
	var tempa=document.getElementById('player_list');
	if(tempa.className=="player_list_none"){
		tempa.className="player_list_now";
		document.getElementById('player_list_btn').className="player_lbtn_now";
	}else{
		tempa.className="player_list_none";
		document.getElementById('player_list_btn').className="player_lbtn_none";
	}
}
function rand(m,n){
	return Math.random()*(n-m)+m|0;
} 
function parseLrc(lrc) {
	var arr = lrc.split(/[\r\n]/),
	len = arr.length,
	words = {},
	times = [], i = 0;
	var musicData = {ti:'',ar:'',al:''};
	for (; i < len;) {
		var temp,doit = true,
		str = decodeURIComponent(arr[i]),
		word = str.replace(/\[\d*:\d*((\.|\:)\d*)*\]/g, '');
		'ti ar al'.replace(/\S+/g,function(a){
			if(doit && musicData[a]===''){
				temp = str.match(new RegExp('\\['+a+'\\:(.*?)\\]'));
					if(temp && temp[1]){
						doit = false;
						musicData[a] = temp[1];
					}
			}
		});
		if(word.length===0){
			word = "…… ……";
		}
		str.replace(/\[(\d*):(\d*)([\.|\:]\d*)*\]/g, function() {
			var min = arguments[1] | 0,
			sec = arguments[2] | 0,
			msec = arguments[3] | 0,
			time = min * 60 + sec+(msec/100),
			p = times.push(time);
			words[p] = word.trim();
		});
		i++;
	}
	times.sort(function(a, b) {
	return a - b;
});
return {
words: words,
times: times,
data:musicData
};
} 
function setLrc(lrc){
	lrc = lrcData = parseLrc(lrc);
	var words = lrc.words, times = lrc.times, data = lrc.data;
	var $len = times.length,$i=0;
	var $pllrcc=Array({"t":"0.10","data":"Oplay - "+$version+" - "+$version_b});
	for($i=0;$i<$len;$i++){
		var $t = times[$i],$w = words[$i+1];
		//alert($t+":"+$w);
		if($t<=0){
			$t=0.02;
		}
		$t=roundFun($t,2);
		//alert($t+":"+$w);
		$pllrcc= $pllrcc.concat({"t":$t,"data":$w});
		
	}
	if(data.al&&document.getElementById('header_info_al').innerHTML=="未知专辑"){
		document.getElementById('header_info_al').innerHTML=data.al;
	}
	if(data.ar&&document.getElementById('header_info_singer').innerHTML=="未知歌手"){
		document.getElementById('header_info_singer').innerHTML=data.ar;
	}
	$pllrc=$pllrcc;
	//data = [data.ti,data.ar,data.al].filter(function(a){return a!==''});
	//$title.html(data.join(' - '));
} 
function loadLrc(url){
	$.get(url, function(lrc){
		localStorage[url] = lrc;
		setLrc(lrc);
	});
} 
function player_showlst(){
	document.getElementById('bodys').style.left=0+"px";
	$nowpage=1;
	inti_style($thems_bg);
}
function player_showlrc(){
	document.getElementById('header').style.backgroundColor="#000";
	document.getElementById('header_con_proces_fill').style.backgroundColor="#fff";
	document.getElementById('header_con_sound_bar_fill').style.backgroundColor="#fff";
	document.getElementById('header_al_pic').style.backgroundColor=$thems_bg;
	document.getElementById('header_con').style.backgroundColor=$thems_bg;
	document.getElementById('bodys').style.backgroundColor="#000";
	document.getElementById('bodys').style.left=-(document.body.clientWidth+30)+"px";
	$nowpage=2;
}
var canvas = document.getElementById('fft');
var canvas2 = document.getElementById('fft2');
var ctx = canvas.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var channels;
var rate;
var frameBufferLength;
var fft;
var audio = document.getElementById('player');
var $peak= new Float32Array(513);
var bd = new BeatDetektor(60, 90);
var vu = new BeatDetektor.modules.vis.VU();
var m_BeatCounter = 0;
var m_BeatTimer = 0;
var fade = 255;
var oldBeat = 0;
var ftimer = 0;
function clearfft(){
	var canvas = document.getElementById('fft');
	var canvas2 = document.getElementById('fft2');
	var ctx = canvas.getContext('2d');
	var ctx2 = canvas2.getContext('2d');
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx2.clearRect(0,0, canvas2.width, canvas2.height);
}
function prefft(i){
	if(($fftstyle==1)&&(i==0)){
				ctx.beginPath();
				ctx.moveTo(0, canvas.height);
	}
	if(($fftstyle==2)&&(i==0)){
				ctx.beginPath();
				ctx.moveTo(0, canvas.height);
	}
	if(($fftstyle==3)&&(i==0)){
				ctx.beginPath();
	}
	if(($fftstyle==4)&&(i==0)){
				ctx.beginPath();
	}
}
function drawfft(i,$ta){
	if($fftstyle==0){
		ctx.fillStyle = $thems_bg ;
		ctx.fillRect(i * 4, canvas.height, 3,$ta);
		var tb="rgba("+$thems_bg.colorRgb()+",0.3)";
		ctx2.fillStyle = tb;
		ctx2.fillRect(i * 4, canvas2.height*0.5, 3, -$ta*0.3);
	}else if($fftstyle==1){
		ctx.strokeStyle = $thems_bg ;
		ctx.lineWidth = 3;
		var $cc=$ta+(canvas.height-10);
		if($cc<=3){
			$cc=3;
		}
		ctx.lineTo(i * 4, $cc);
		
	}else if($fftstyle==2){
		var tb="rgba("+$thems_bg.colorRgb()+",0.3)";
		ctx.fillStyle = tb;
		ctx.strokeStyle = tb ;
		ctx.lineWidth = 3;
		var $cc=$ta+(canvas.height-10);
		if($cc<=3){
			$cc=3;
		}
		ctx.lineTo(i * 4, $cc);
		
	}else if($fftstyle==3){
		ctx.strokeStyle = $thems_bg ;
		ctx.lineWidth = 3;
		var $cc=$ta+(canvas.height-10);
		if($cc<=3){
			$cc=3;
		}
		ctx.moveTo(i * 4, canvas.height/2 - $ta/2);
		ctx.lineTo(i * 4, canvas.height/2 + $ta/2);
	}else if($fftstyle==4){
		ctx.fillStyle = $thems_bg ;
		ctx.fillRect(i * 4, canvas.height, 3,$ta);
		var tb="rgba("+$thems_bg.colorRgb()+",0.3)";
		ctx2.fillStyle = tb;
		ctx2.fillRect(i * 4, canvas2.height*0.5, 3, -$ta*0.3);
	}
}
function postfft(i,fftm){
	if(($fftstyle==1)&&(i==(fftm-1))){
				ctx.stroke();
				ctx.closePath();
	}
	if(($fftstyle==2)&&(i==(fftm-1))){
				ctx.lineTo(i * 4,canvas.height);
				ctx.lineTo(0, canvas.height);
				ctx.stroke();
				ctx.closePath();
				ctx.fill();
	}
	if(($fftstyle==3)&&(i==(fftm-1))){
				ctx.stroke();
				ctx.closePath();
	}
	if(($fftstyle==4)&&(i==(fftm-1))){
				ctx.fill();
	}
}
function beateffect(){
	if ( oldBeat != bd.win_bpm_int_lo ) {
    	document.getElementById('header_info_frameb').innerHTML=bd.win_bpm_int_lo+" BPM ";
  	}
	oldBeat = bd.win_bpm_int_lo;
}
      function loadedMetadata() {
        channels          = audio.mozChannels;
        rate              = audio.mozSampleRate;
        frameBufferLength = audio.mozFrameBufferLength;
		document.getElementById('header_info_rate').innerHTML=roundFun((rate/1000),1)+"KHz ";
		document.getElementById('header_info_chanel').innerHTML=channels+" 声道";
		document.getElementById('header_info_frameb').innerHTML="检测中";
        fft = new FFT(frameBufferLength / channels, rate);
      }

      function audioAvailable(event) {
        var fb = event.frameBuffer,
            t  = event.time, /* unused, but it's there */
            signal = new Float32Array(fb.length / channels),
            magnitude;
			bd.process( t, fft.spectrum );
		 
        for (var i = 0, fbl = frameBufferLength / 2; i < fbl; i++ ) {
          // Assuming interlaced stereo channels,
          // need to split and merge into a stero-mix mono signal
          signal[i] = (fb[2*i] + fb[2*i+1]) / 2;
        }

        fft.forward(signal);

        // Clear the canvas before drawing spectrum
        clearfft();
		/*for($j=0;$j<512;$j++){
			var ta=-fft.spectrum[$j] * 4000;
			
			if($peak[$j]>=ta){
				$peak[$j]=ta;
			}else{
				$peak[$j]*=0.99;
			}
		}*/
        for (var i = 0; i < fft.spectrum.length; i++ ) {
			prefft(i);
			
          // multiply spectrum by a zoom value
          magnitude = fft.spectrum[i] * 4000;

          // Draw rectangle bars for each frequency bin
          var $ta=-magnitude;
		  drawfft(i,$ta);
		  postfft(i,fft.spectrum.length);
		  beateffect();
        }
      }
	  if('mozWriteAudio' in new Audio()){
		  audio.addEventListener('MozAudioAvailable', audioAvailable, false);
     	  audio.addEventListener('loadedmetadata', loadedMetadata, false);
	  }
	  
	  //if(window.webkitAudioContext){
		//  window.addEventListener('load', webkitreadaudio, false);
		  //webkitreadaudio();
	  //}
	  if(window.webkitAudioContext){
		  var context = new webkitAudioContext();
		  var analyser = context.createAnalyser();
	  }
	  function rafCallback(time) {
		  clearfft();
		   window.webkitRequestAnimationFrame(rafCallback, canvas);
			var OFFSET = 100;
			var freqByteData = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(freqByteData); //analyser.getByteTimeDomainData(freqByteData);
			bd.process( audio.currentTime, freqByteData );
			for (var i = 0; i < 512; i++ ) {
				prefft(i);
				var j=i+64;
          		magnitude = 0.6*((freqByteData[j*2] + freqByteData[(j+1)*2])/2); 
				//console.log(magnitude);
          		var $ta=-magnitude;
		  		drawfft(i,$ta);
		  		postfft(i,512);
		  		beateffect();
       		}
        	
		}
		
      // FFT from dsp.js, see below
      var FFT = function(bufferSize, sampleRate) {
        this.bufferSize   = bufferSize;
        this.sampleRate   = sampleRate;
        this.spectrum     = new Float32Array(bufferSize/2);
        this.real         = new Float32Array(bufferSize);
        this.imag         = new Float32Array(bufferSize);
        this.reverseTable = new Uint32Array(bufferSize);
        this.sinTable     = new Float32Array(bufferSize);
        this.cosTable     = new Float32Array(bufferSize);

        var limit = 1,
            bit = bufferSize >> 1;

        while ( limit < bufferSize ) {
          for ( var i = 0; i < limit; i++ ) {
            this.reverseTable[i + limit] = this.reverseTable[i] + bit;
          }

          limit = limit << 1;
          bit = bit >> 1;
        }

        for ( var i = 0; i < bufferSize; i++ ) {
          this.sinTable[i] = Math.sin(-Math.PI/i);
          this.cosTable[i] = Math.cos(-Math.PI/i);
        }
      };

      FFT.prototype.forward = function(buffer) {
        var bufferSize   = this.bufferSize,
            cosTable     = this.cosTable,
            sinTable     = this.sinTable,
            reverseTable = this.reverseTable,
            real         = this.real,
            imag         = this.imag,
            spectrum     = this.spectrum;

        if ( bufferSize !== buffer.length ) {
          throw "Supplied buffer is not the same size as defined FFT. FFT Size: " + bufferSize + " Buffer Size: " + buffer.length;
        }

        for ( var i = 0; i < bufferSize; i++ ) {
          real[i] = buffer[reverseTable[i]];
          imag[i] = 0;
        }

        var halfSize = 1,
            phaseShiftStepReal,	
            phaseShiftStepImag,
            currentPhaseShiftReal,
            currentPhaseShiftImag,
            off,
            tr,
            ti,
            tmpReal,	
            i;

        while ( halfSize < bufferSize ) {
          phaseShiftStepReal = cosTable[halfSize];
          phaseShiftStepImag = sinTable[halfSize];
          currentPhaseShiftReal = 1.0;
          currentPhaseShiftImag = 0.0;

          for ( var fftStep = 0; fftStep < halfSize; fftStep++ ) {
            i = fftStep;

            while ( i < bufferSize ) {
              off = i + halfSize;
              tr = (currentPhaseShiftReal * real[off]) - (currentPhaseShiftImag * imag[off]);
              ti = (currentPhaseShiftReal * imag[off]) + (currentPhaseShiftImag * real[off]);

              real[off] = real[i] - tr;
              imag[off] = imag[i] - ti;
              real[i] += tr;
              imag[i] += ti;

              i += halfSize << 1;
            }

            tmpReal = currentPhaseShiftReal;
            currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag);
            currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal);
          }

          halfSize = halfSize << 1;
	}

        i = bufferSize/2;
        while(i--) {
          spectrum[i] = 2 * Math.sqrt(real[i] * real[i] + imag[i] * imag[i]) / bufferSize;
	}
      };
	  
function webkitreadaudio(){
	var source = context.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(context.destination);
	rafCallback();
}
String.prototype.colorRgb = function(){
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
 var sColor = this.toLowerCase();
 if(sColor && reg.test(sColor)){
  if(sColor.length === 4){
   var sColorNew = "#";
   for(var i=1; i<4; i+=1){
    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1)); 
   }
   sColor = sColorNew;
  }
  //处理六位的颜色值
  var sColorChange = [];
  for(var i=1; i<7; i+=2){
   sColorChange.push(parseInt("0x"+sColor.slice(i,i+2))); 
  }
  return sColorChange;
 }else{
  return sColor; 
 }
};
function  roundFun(numberRound,roundDigit){  
	if(numberRound>=0){  
		var tempNumber = parseInt((numberRound*Math.pow(10,roundDigit)+0.5))/Math.pow(10,roundDigit);  
		return   tempNumber;  
	}else{  
  		numberRound1=-numberRound  
  		var tempNumber=parseInt((numberRound1*Math.pow(10,roundDigit)+0.5))/Math.pow(10,roundDigit);  
  		return -tempNumber;  
	}  
}
/*  
canvasele.prototype.line = function(x1, y1, x2, y2) {
  this.lineCap = 'round';
  this.beginPath();
  this.moveTo(x1, y1);
  this.lineTo(x2, y2);
  this.closePath();
  this.stroke();
}
canvasele.prototype.circle = function(x, y, r, fill_opt) {
  this.beginPath();
  this.arc(x, y, r, 0, Math.PI * 2, true);
  this.closePath();
  if (fill_opt) {
    this.fillStyle = 'rgba(0,0,0,1)';
    this.fill();
    this.stroke();
  } else {
    this.stroke();
  }
}
canvasele.prototype.circle = function(x, y, r, fill_opt) {
  this.beginPath();
  this.arc(x, y, r, 0, Math.PI * 2, true);
  this.closePath();
  if (fill_opt) {
    this.fillStyle = 'rgba(0,0,0,1)';
    this.fill();
    this.stroke();
  } else {
    this.stroke();
  }
}
canvasele.prototype.rectangle = function(x, y, w, h, fill_opt) {
  this.beginPath();
  this.rect(x, y, w, h);
  this.closePath();
  if (fill_opt) {
    this.fillStyle = 'rgba(0,0,0,1)';
    this.fill();
  } else {
    this.stroke();
  }
}
canvasele.prototype.triangle = function(p1, p2, p3, fill_opt) {
  // Stroked triangle.
  this.beginPath();
  this.moveTo(p1.x, p1.y);
  this.lineTo(p2.x, p2.y);
  this.lineTo(p3.x, p3.y);
  this.closePath();
  if (fill_opt) {
    this.fillStyle = 'rgba(0,0,0,1)';
    this.fill();
  } else {
    this.stroke();
  }
}
canvasele.prototype.clear = function() {
  this.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
}*/