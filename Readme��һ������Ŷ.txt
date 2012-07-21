Build 2012071402 Pre Alpha V0.1

	现在pre alpha暂不开源哦.alpha出后一定开源github

Build 2012071504 Pre Alpha V0.1a

	--修正了歌词算法，目前歌词基本同步了。
	--添加播放列表分页支持
	--播放列表伪3D特效

Build 2012071812 Pre Alpha V0.1b

	--播放列表伪3D特效加强
	--添加歌词秀背景
	--添加多分辨率响应式支持（歌词字体响应式bug中）
	--添加响应式自动分页
	--添加全屏功能

Build 2012071821 Pre Alpha V0.1c

	--添加chrome的波谱分析（still buging 见下）

Build 2012072101 Pre Alpha V0.1d

	--添加history push 现在每一首歌都有播放历史了，而且可以通过点击(http:xxxxxx/index.html?4234|:|ggggg)的方式直接播放指定音乐。
	--关于在MOZ 14和Webkit以及以前的MOZ上动画不同的原因不明。


						by scientihark

目前已知：
由于W3c Audio标准制定中（2010年到2012年还在制定，这类API将十分底层）
firefox 13+最完整特性：

	Audio --播放  （OGG）
	transction --2D动画特效（基本界面、歌词秀动画、歌词秀背景）
	transfrom --伪3D动画特效（专辑动画，播放列表动画）
	XHR--歌词秀
	Audio API --播放控制，歌词同步
	Audio Data API (MOZ版)--码率、声道、波谱分析（未来均衡器、合成、环境等等）
	CSS3 media screen --多分辨率响应式（自动化响应由js辅助）

Chrome目前
	
	还不支持Audio Data API(MOZ版)，而是用webkitcontext+buffer,小试了下，太复杂。不好整合。因此，chrome 木有码率、声道，其他不错（OGG音质弱于MOZ）
	经过技术研究，Audio API问题基本解决了（使用了createMediaSourceElement 将MOZ的audio DATA API 和 webkit的wen audio api融合解决了数据流问题。），但是目前chrome存在bug,createMediaSourceElement绑定Audio对象后如果修改SRC就会出现 crash(18)|| 声音诡异变速（数据流BUG，JS无法解决）（19~22【22.0.1210.0 (147194)】），因此chrome播放第一首歌完美（波形的平滑度远高于moz,但ogg音质较差)，大家可以自己决定是否预览（不预览的，希望流畅播放的开始播放前 在console 敲入$webkitloaded=1;）;

Opera目前
	不支持Audio Data API(MOZ版) 木有码率、声道、波谱分析
	不支持transction 2D动画特效

IE目前
	额~~
	IE8+Pure IE9好像木有支持的
	加了HTML5支持库的IE9木有测试
	IE10木有测试，应该可用

safari 我的safari挂了，木有测.不过webkit应该和chrome差不多

目前firefox只支持ogg
chrome可以有ogg mp3 m4a
IE10 wma wav(ogg未测)
opera ogg (其他未测)

目前有纯js的mp3,flac,alac,aac,wav解码器，但是太复杂，暂时木有用。
