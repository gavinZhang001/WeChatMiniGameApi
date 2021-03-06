/**
 * Type definitions for wegame main context
 * Project: https://developers.weixin.qq.com/minigame/dev/index.html
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 * Definitions by: J.C <https://github.com/jcyuan>
 * Reorganized by: Will Zhu <https://github.com/WillJoo>
 */

//声明全局变量
declare const canvas: wx.types.Canvas;

//声明全局函数

/**
 * 在下次进行重绘时执行
 * @param callback
 * @returns 请求 ID
 */
declare function requestAnimationFrame(callback: () => void): number;

/**
 * 取消一个先前通过调用 @function requestAnimationFrame 方法添加到计划中的动画帧请求
 * @param requestID 请求 ID
 */
declare function cancelAnimationFrame(requestID: number): void;

/**
 * 设定一个定时器。在定时到期以后执行注册的回调函数
 * @param callback 回调函数
 * @param delay 延迟的时间，函数的调用会在该延迟之后发生，单位 ms。
 * @param rest param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。
 * @return 定时器的编号。这个值可以传递给 clearTimeout 来取消该定时。
 */
declare function setTimeout(callback: () => void, delay: number, ...rest: any[]): number;
/**
 * 取消由 setTimeout 设置的定时器。
 * @param timeoutID 要取消的定时器的 ID
 */
declare function clearTimeout(timeoutID: number): void;
/**
 * 设定一个定时器。按照指定的周期（以毫秒计）来执行注册的回调函数
 * @param callback 回调函数
 * @param delay 执行回调函数之间的时间间隔，单位 ms。
 * @param rest param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。
 * @return 定时器的编号。这个值可以传递给 clearInterval 来取消该定时。
 */
declare function setInterval(callback: () => void, delay: number, ...rest: any[]): number;
/**
 * 取消由 setInterval 设置的定时器。
 * @param intervalID 要取消的定时器的 ID
 */
declare function clearInterval(intervalID: number): void;

declare namespace wx {
    namespace types {
        interface Response {
            /* 错误信息 */
            errMsg: string;
            /* 错误码 */
            errCode?: number;
        }
        interface CallbackParams<T extends Response = Response> {
            /**
             * 接口调用成功的回调函数
             */
            success?: (res: T) => void;
            /**
             * 接口调用失败的回调函数
             */
            fail?: (res: Response) => void;
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: (res: T) => void;
        }
    }
}

declare namespace wx {
    namespace types {
        interface SystemInfo {
            /**
             * 手机品牌
             * 支持版本 >= 1.5.0
             */
            brand: string;
            /**
             * 手机型号
             */
            model: string;
            /**
             * 设备像素比
             */
            pixelRatio: number;
            /**
             * 屏幕宽度
             * 支持版本 >= 1.1.0
             */
            screenWidth: number;
            /**
             * 屏幕高度
             * 支持版本 >= 1.1.0
             */
            screenHeight: number;
            /**
             * 可使用窗口宽度
             */
            windowWidth: number;
            /**
             * 可使用窗口高度
             */
            windowHeight: number;
            /**
             * 状态栏的高度
             * 支持版本 >= 1.9.0
             */
            statusBarHeight: number;
            /**
             * 微信设置的语言
             */
            language: string;
            /**
             * 微信版本号
             */
            version: string;
            /**
             * 操作系统版本
             */
            system: string;
            /**
             * 客户端平台
             */
            platform: string;
            /**
             * 用户字体大小设置。
             * 以“我-设置-通用-字体大小”中的设置为准，单位 px。
             * 支持版本 >= 1.5.0
             */
            fontSizeSetting: string;
            /**
             * 客户端基础库版本
             * 支持版本 >= 1.1.0
             */
            SDKVersion: string;
            /**
             * 性能等级
             * 支持版本 >= 1.8.0
             */
            benchmarkLevel: number;
            /**
             * 电量，范围 1 - 100
             */
            battery: number;
            /**
             * wifi 信号强度，范围 0 - 4
             */
            wifiSignal: number;
        }
        interface GetSystemInfoResponse extends SystemInfo, Response {
        }
    }
    /**
     * 获取系统信息
     */
    function getSystemInfo(params: types.CallbackParams<types.GetSystemInfoResponse>): void;
    /**
     * @function getSystemInfo 的同步版本
     */
    function getSystemInfoSync(): types.SystemInfo;
}

declare namespace wx {
    namespace types {
        /**
         * UpdateManager 对象，用来管理更新
         */
        interface UpdateManager {
            /**
             * 强制小程序重启并使用新版本。
             * 在小程序新版本下载完成后（即收到 onUpdateReady 回调）调用。
             */
            applyUpdate(): void;
            /**
             * 监听向微信后台请求检查更新结果事件。
             * 微信在小程序冷启动时自动检查更新，不需由开发者主动触发。
             */
            onCheckForUpdate(callback: () => void): void;
            /**
             * 监听小程序有版本更新事件。
             * 客户端主动触发下载（无需开发者触发），下载成功后回调
             */
            onUpdateReady(callback: () => void): void;
            /**
             * 监听小程序更新失败事件。
             * 小程序有新版本，客户端主动触发下载（无需开发者触发），下载失败（可能是网络原因等）后回调
             */
            onUpdateFailed(callback: () => void): void;
        }
    }
    /**
     * 获取全局唯一的版本更新管理器，用于管理小程序更新。
     * 关于小程序的更新机制，可以查看运行机制文档。
     * 支持版本 >= 1.9.90
     */
    function getUpdateManager(): types.UpdateManager;
}

declare namespace wx {
    namespace types {
        interface ReferrerInfo {
            /**
             * 来源小程序或公众号或App的 appId
             */
            appId: string;
            /**
             * 来源小程序传过来的数据
             * scene=1037或1038时支持
             */
            extraData?: any;
        }
        interface ShowOption {
            /**
             * 场景值
             */
            scene: number;
            /**
             * 启动参数
             */
            query: any;
            /**
             * 分享标志
             * 从群内分享链接进入时支持
             */
            shareTicket?: string;
            /**
             * 当场景为由从另一个小程序或公众号或App打开时，返回此字段
             */
            referrerInfo?: ReferrerInfo;
            sessionid: string;
        }
        interface LaunchOption extends ShowOption {
            /**
             * 当前小游戏是否被显示在聊天顶部
             */
            isSticky: boolean;
        }
    }
    /**
     * 监听小游戏回到前台的事件
     */
    function onShow(callback: (res: types.ShowOption) => void): void;
    /**
     * 取消监听小游戏回到前台的事件
     */
    function offShow(callback: (res: types.ShowOption) => void): void;
    /**
     * 监听小游戏隐藏到后台事件
     * 锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
     */
    function onHide(callback: () => void): void;
    /**
     * 取消监听小游戏隐藏到后台事件
     */
    function offHide(callback: () => void): void;
    /**
     * 退出当前小游戏
     */
    function exitMiniProgram(params?: types.CallbackParams): void;
    /**
     * 返回小程序启动参数
     */
    function getLaunchOptionsSync(): types.LaunchOption;
}

declare namespace wx {
    /**
     * 监听音频因为受到系统占用而被中断开始
     * 以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，小程序内所有音频会暂停。
     */
    function onAudioInterruptionBegin(callback: () => void): void;
    /**
     * 取消监听音频因为受到系统占用而被中断开始
     */
    function offAudioInterruptionBegin(callback: () => void): void;
    /**
     * 监听音频中断结束
     * 在收到 @function onAudioInterruptionBegin 事件之后，小程序内所有音频会暂停，收到此事件之后才可再次播放成功
     */
    function onAudioInterruptionEnd(callback: () => void): void;
    /**
     * 取消监听音频中断结束
     */
    function offAudioInterruptionEnd(callback: () => void): void;
    /**
     * 监听全局错误事件
     */
    function onError(callback: (res: { message: string, stack: string }) => void): void;
    /**
     * 取消监听全局错误事件
     */
    function offError(callback: (res: { message: string, stack: string }) => void): void;
}

declare namespace wx {
    namespace types {
        interface Touch {
            /**
             * Touch 对象的唯一标识符，只读属性
             * 一次触摸动作(我们值的是手指的触摸)在平面上移动的整个过程中, 该标识符不变。
             * 可以根据它来判断跟踪的是否是同一次触摸过程。
             */
            identifier: number;
            /**
             * 触点相对于屏幕左边沿的 X 坐标。
             */
            screenX: number;
            /**
             * 触点相对于屏幕左边沿的 Y 坐标。
             */
            screenY: number;
        }
        interface TouchEvent {
            /**
             * 当前所有触摸点的列表
             */
            touches: Touch[];
            /**
             * 触发此次事件的触摸点列表
             */
            changedTouches: Touch[];
            /**
             * 事件触发时的时间戳
             */
            timeStamp: number;
        }
    }
    /**
     * 监听开始始触摸事件
     */
    function onTouchStart(callback: (res: types.TouchEvent) => void): void;
    function offTouchStart(callback: (res: types.TouchEvent) => void): void;
    /**
     * 监听触点移动事件
     */
    function onTouchMove(callback: (res: types.TouchEvent) => void): void;
    function offTouchMove(callback: (res: types.TouchEvent) => void): void;
    /**
     * 监听触摸结束事件
     */
    function onTouchEnd(callback: (res: types.TouchEvent) => void): void;
    function offTouchEnd(callback: (res: types.TouchEvent) => void): void;
    /**
     * 监听触点失效事件
     */
    function onTouchCancel(callback: (res: types.TouchEvent) => void): void;
    function offTouchCancel(callback: (res: types.TouchEvent) => void): void;
}

declare namespace wx {
    namespace types {
        interface Performance {
            /**
             * 可以获取当前时间以微秒为单位的时间戳
             */
            now(): number;
        }
    }
    /**
     * 获取性能管理器
     */
    function getPerformance(): types.Performance;
    /**
     * 加快触发 JavaScriptCore Garbage Collection（垃圾回收）。
     * GC 时机是由 JavaScriptCore 来控制的，并不能保证调用后马上触发 GC。
     */
    function triggerGC(): void;
}

declare namespace wx {
    namespace types {
        interface LoadSubpackageParams extends CallbackParams {
            /**
             * 分包的名字，可以填 name 或者 root
             */
            name: string;
        }
        interface LoadSubpackageTask {
            /**
             * 监听分包加载进度变化事件
             * @param callback.res.progress 分包下载进度百分比
             * @param callback.res.totalBytesWritten 已经下载的数据长度，单位 Bytes
             * @param callback.res.totalBytesExpectedToWrite 预期需要下载的数据总长度，单位 Bytes
             */
            onProgressUpdate(callback: (res: { progress: number, totalBytesWritten: number, totalBytesExpectedToWrite: number }) => void): void;
        }
    }
    /**
     * 触发分包加载
     * 详见 分包加载(https://developers.weixin.qq.com/minigame/dev/tutorial/base/subpackages.html)
     * 支持版本 >= 2.1.0
     */
    function loadSubpackage(params: types.LoadSubpackageParams): types.LoadSubpackageTask;
}

declare namespace wx {
    namespace types {
        interface SetEnableDebugParams extends CallbackParams {
            /**
             * 是否打开调试
             */
            enableDebug: boolean;
        }
    }
    /**
     * 设置是否打开调试开关，此开关对正式版也能生效。
     * 支持版本 >= 1.4.0
     */
    function setEnableDebug(params: types.SetEnableDebugParams): void;
}

declare namespace wx {
    namespace types {
        interface ToTempFileSyncParams {
            /**
             * 截取 canvas 的左上角横坐标
             */
            x?: number;
            /**
             * 截取 canvas 的左上角纵坐标
             */
            y?: number;
            /**
             * 截取 canvas 的宽度
             */
            width?: number;
            /**
             * 截取 canvas 的高度
             */
            height?: number;
            /**
             * 目标文件的宽度，会将截取的部分拉伸或压缩至该数值
             */
            destWidth?: number;
            /**
             * 目标文件的高度，会将截取的部分拉伸或压缩至该数值
             */
            destHeight?: number;
            /**
             * 目标文件的类型
             */
            fileType?: "jpg" | "png";
            /**
             * jpg图片的质量，仅当 fileType 为 jpg 时有效。取值范围为 0.0（最低）- 1.0（最高），不含 0。不在范围内时当作 1.0
             */
            quality?: number;
        }
        interface ToTempFileParams extends ToTempFileSyncParams, CallbackParams<ToTempFileResponse> {
        }
        interface ToTempFileResponse extends Response {
            /**
             * canvas 生成的临时文件路径
             */
            tempFilePath: string;
        }
        interface RenderingContextConfig extends CanvasRenderingContext2DSettings {
            /**
             * 表示是否抗锯齿
             */
            antialias?: boolean;
            /**
             * 表示是否绘图完成后是否保留绘图缓冲区
             */
            preserveDrawingBuffer?: boolean;
            /**
             * 抗锯齿样本数。
             * 最小值为 2，最大不超过系统限制数量
             * 仅 iOS 支持
             */
            antialiasSamples?: number;
        }
        interface WebGLRenderingContext extends WebGLRenderingContextBase {
            /**
             * 将一个 Canvas 对应的 Texture 绑定到 WebGL 上下文。
             * @param texture WebGL 的纹理类型枚举值
             * @param canvas 需要绑定为 Texture 的 Canvas
             */
            wxBindCanvasTexture(texture: number, canvas: Canvas): void;
        }
        interface Canvas extends HTMLCanvasElement {
            /**
             * 画布的宽度
             */
            width: number;
            /**
             * 画布的高度
             */
            height: number;
            /**
             * 将当前 Canvas 保存为一个临时文件，并生成相应的临时文件路径。
             */
            toTempFilePath(p: ToTempFileParams): void;
            /**
             * toTempFilePath 的同步版本
             */
            toTempFilePathSync(p?: ToTempFileSyncParams): string;
            /**
             * 获取画布对象的绘图上下文
             * @param contextType 上下文类型
             * 
             * iOS/Android 不支持的 2d 属性和接口
             *   @property globalCompositeOperation 不支持以下值,如果使用，不会报错，但是将得到与预期不符的结果。
             *     @argument source-in
             *     @argument source-out
             *     @argument destination-atop
             *     @argument lighter
             *     @argument copy
             *   @function isPointInPath
             */
            getContext(contextType: "2d"): CanvasRenderingContext2D;
            /**
             * 获取画布对象的绘图上下文
             * @param contextType 上下文类型
             * @param contextAttributes webgl 上下文属性，仅当 @param contextType 为 @argument webgl 时有效
             * 
             * iOS/Android 不支持的 WebGL 接口
             *   @function pixelStorei 当第一个参数是 @argument gl.UNPACK_COLORSPACE_CONVERSION_WEBGL 时
             *   @function compressedTexImage2D
             *   @function compressedTexSubImage2D
             * 
             * 除此之外 Android 还不支持 WebGL 接口
             *   @function getExtension
             *   @function getSupportedExtensions
             */
            getContext(contextType: "webgl", contextAttributes: RenderingContextConfig): WebGLRenderingContext;
            /**
             * 把画布上的绘制内容以一个 data URI 的格式返回
             */
            toDataURL(): string;
        }
    }
    /**
     * 创建一个画布对象。首次调用创建的是显示在屏幕上的画布，之后调用创建的都是离屏画布。
     * @returns 画布对象
     */
    function createCanvas(): types.Canvas;
}

declare namespace wx {
    /**
     * 可以修改渲染帧率。默认渲染帧率为 60 帧每秒。修改后，requestAnimationFrame 的回调频率会发生改变。
     * @param fps 帧率，有效范围 1 - 60。
     */
    function setPreferredFramesPerSecond(fps: number): void;
}

declare namespace wx {
    namespace types {
        interface TextLineHeightParams extends CallbackParams<TextLineHeightResponse> {
            /**
             * 字体样式
             * @default normal
             * @argument normal 正常
             * @argument italic 斜体
             */
            fontStyle?: "normal" | "italic";
            /**
             * 字重
             * @default normal
             * @argument normal 正常
             * @argument bold 粗体
             */
            fontWeight?: "normal" | "bold";
            /**
             * 字号
             * @default 16
             */
            fontSize?: number;
            /**
             * 字体名称
             */
            fontFamily: string;
            /**
             * 文本的内容
             */
            text: string;
        }
        interface TextLineHeightResponse extends Response {
            /**
             * 文本的行高
             */
            lineHeight: number;
        }
    }
    /**
     * 加载自定义字体文件
     * @param path 字体文件路径。可以是代码包文件路径，也可以是 wxfile:// 协议的本地文件路径。
     * @returns 如果加载字体成功，则返回字体 family 值，否则返回 null
     */
    function loadFont(path: string): string | null;
    /**
     * 获取一行文本的行高
     * @param params 字体参数
     * @returns 文本的行高
     */
    function getTextLineHeight(params: types.TextLineHeightParams): void;
}

declare namespace wx {
    namespace types {
        interface Image extends HTMLImageElement {
            /**
             * 图片的 URL
             */
            src: string;
            /**
             * 图片的真实宽度
             */
            width: number;
            /**
             * 图片的真实高度
             */
            height: number;
            /**
             * 图片加载完成后触发的回调函数
             */
            onload(): void;
            /**
             * 图片加载发生错误后触发的回调函数
             */
            onerror(): void;
        }
    }
    /**
     * 创建一个图片对象
     * @returns 图片对象
     */
    function createImage(): types.Image;
}

declare namespace wx {
    namespace types {
        interface AdStyle {
            /**
             * 广告组件的左上角横坐标
             */
            left: number;
            /**
             * banner 广告组件的左上角纵坐标
             */
            top: number;
            /**
             * banner 广告组件的宽度。最小 300，最大至 屏幕宽度（屏幕宽度可以通过 getSystemInfoSync() 获取）。
             */
            width: number;
            /**
             * banner 广告组件的高度
             */
            height: number;
            /**
             * banner 广告组件经过缩放后真实的宽度
             */
            realWidth?: number;
            /**
             * banner 广告组件经过缩放后真实的高度
             */
            realHeight?: number;
        }
        interface AdParams {
            /**
             * 广告单元 id
             */
            adUnitId: string;
        }
        interface Ad {
            /**
             * 显示 banner 广告。
             */
            show(): Promise<void>;
            /**
             * 隐藏 banner 广告
             */
            hide(): void;
            /**
             * 销毁 banner 广告
             */
            destroy(): void;
            /**
             * 监听 banner 广告缩放
             */
            onResize(callback: (res: { width: number, height: number }) => void): void;
            /**
             * 取消监听隐藏 banner 广告缩放
             */
            offResize(callback: (res: { width: number, height: number }) => void): void;
            /**
             * 监听 banner 广告加载事件
             */
            onLoad(callback: () => void): void;
            /**
             * 取消监听 banner 广告加载事件
             */
            offLoad(callback: () => void): void;
            /**
             * 监听 banner 广告错误事件
             */
            onError(callback: (res: Response) => void): void;
            /**
             * 取消监听 banner 广告错误事件
             */
            offError(callback: (res: Response) => void): void;
        }
        interface BannerAdParams extends AdParams {
            /**
             * banner 广告组件的样式
             */
            style: types.AdStyle;
        }
        /**
         * banner 广告组件。
         * banner 广告组件是一个原生组件，层级比上屏 Canvas 高，会覆盖在上屏 Canvas 上。
         * banner 广告组件默认是隐藏的，需要调用 @function BannerAd.show 将其显示。
         * banner 广告会根据开发者设置的宽度进行等比缩放，缩放后的尺寸将通过 @function BannerAd.onResize 事件提供。
         */
        interface BannerAd extends BannerAdParams, Ad {
        }
        /**
         * 激励视频广告组件。
         * 激励视频广告组件是一个原生组件，并且是一个全局单例。
         * 层级比上屏 Canvas 高，会覆盖在上屏 Canvas 上。
         * 激励视频 广告组件默认是隐藏的，需要调用 @function RewardedVideoAd.show 将其显示。
         */
        interface RewardedVideoAd extends AdParams, Ad {
            /**
             * 加载视频广告
             */
            load(): Promise<void>;
            /**
             * 监听用户点击 关闭广告 按钮的事件
             */
            onClose(callback: (res: { isEnded: boolean }) => void): void;
            /**
             * 关闭监听用户点击 关闭广告 按钮的事件
             */
            offClose(callback: (res: { isEnded: boolean }) => void): void;
        }
    }
    /**
     * 创建 banner 广告组件。
     * 请通过 @function getSystemInfoSync 返回对象的 SDKVersion 判断基础库版本号 >= 2.0.4 后再使用该 API。
     * 同时，开发者工具上暂不支持调试该 API，请直接在真机上进行调试。
     * 支持版本 >= 2.0.4
     */
    function createBannerAd(params: types.BannerAdParams): types.BannerAd;
    /**
     * 创建激励视频广告组件。
     * 请通过 getSystemInfoSync() 返回对象的 SDKVersion 判断基础库版本号 >= 2.0.4 后再使用该 API。
     * 同时，开发者工具上暂不支持调试该 API，请直接在真机上进行调试。
     * 支持版本 >= 2.0.4
     */
    function createRewardedVideoAd(params: types.AdParams): types.RewardedVideoAd;
}

declare namespace wx {
    namespace types {
        interface ShowActionSheetParams extends CallbackParams {
            /**
             * 按钮的文字数组，数组长度最大为 6
             */
            itemList: string[],
            /**
             * 按钮的文字颜色
             * @default #000000
             */
            itemColor?: string,
        }
        interface ShowLoadingParams extends CallbackParams {
            /**
             * 提示的内容
             */
            title?: string,
            /**
             * 是否显示透明蒙层，防止触摸穿透
             * @default false
             */
            mask?: boolean,
        }
        interface ShowToastParams extends CallbackParams {
            /**
             * 提示的内容
             */
            title: string;
            /**
             * 图标
             * @default "success"
             */
            icon: "success" | "loading";
            /**
             * 自定义图标的本地路径，image 的优先级高于 icon
             * 支持版本 >= 1.1.0
             */
            image: string;
            /**
             * 提示的延迟时间
             * @default 1500
             */
            duration: number;
            /**
             * 是否显示透明蒙层，防止触摸穿透
             * @default false
             */
            mask: boolean;
        }
        interface ShowModalParams extends CallbackParams<ShowModalResponse> {
            /**
             * 提示的标题
             */
            title?: string,
            /**
             * 提示的内容
             */
            content?: string,
            /**
             * 是否显示取消按钮
             * @default true
             */
            showCancel?: boolean,
            /**
             * 取消按钮的文字，最多 4 个字符串
             */
            cancelText?: string,
            /**
             * 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串
             * @default #000000
             */
            cancelColor?: string,
            /**
             * 确认按钮的文字，最多 4 个字符串
             */
            confirmText?: string,
            /**
             * 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
             * @default #3cc51f
             */
            confirmColor?: string
        }
        interface ShowModalResponse extends Response {
            /**
             * 为 true 时，表示用户点击了确定按钮
             */
            confirm?: boolean;
            /**
             * 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
             * 支持版本 >= 1.1.0
             */
            cancel?: boolean;
        }
    }
    /**
     * 显示选择器
     */
    function showActionSheet(params: types.ShowActionSheetParams): void;
    /**
     * 显示 loading 提示框, 需主动调用 @function hideLoading 才能关闭提示框
     * 支持版本 >= 1.1.0
     */
    function showLoading(params?: types.ShowLoadingParams): void;
    /**
     * 隐藏 loading 提示框
     */
    function hideLoading(params?: types.CallbackParams): void;
    /**
     * 显示消息提示框
     */
    function showToast(params: types.ShowToastParams): void;
    /**
     * 隐藏消息提示框
     */
    function hideToast(params?: types.CallbackParams): void;
    /**
     * 显示模态对话框
     */
    function showModal(params: types.ShowModalParams): void;
}

declare namespace wx {
    namespace types {
        interface ShowKeyboardParams {
            /**
             * 键盘输入框显示的默认值
             */
            defaultValue: string;
            /**
             * 键盘中文本的最大长度
             */
            maxLength?: number;
            /**
             * 是否为多行输入
             */
            multiple?: boolean;
            /**
             * 当点击完成时键盘是否收起
             */
            confirmHold?: boolean;
            /**
             * 键盘右下角 confirm 按钮的类型，只影响按钮的文本内容
             * @value done      完成
             * @value next      下一个
             * @value search    搜索
             * @value go        前往
             * @value send      发送
             */
            confirmType?: "done" | "next" | "search" | "go" | "send";
        }

        interface UpdateKeyboardParams extends CallbackParams {
            /**
             * 键盘输入框的当前值
             */
            value: string,
        }
    }
    /**
     * 显示键盘
     */
    function showKeyboard(params: types.ShowKeyboardParams): void;
    /**
     * 隐藏键盘
     */
    function hideKeyboard(): void;
    /**
     * 监听键盘输入事件
     * @param callback.res.value 键盘输入的当前值
     */
    function onKeyboardInput(callback: (res: { value: string }) => void): void;
    /**
     * 取消监听键盘输入事件
     */
    function offKeyboardInput(callback: (res: { value: string }) => void): void;
    /**
     * 监听用户点击键盘 Confirm 按钮时的事件
     * @param callback.res.value 键盘输入的当前值
     */
    function onKeyboardConfirm(callback: (res: { value: string }) => void): void;
    /**
     * 取消监听用户点击键盘 Confirm 按钮时的事件
     */
    function offKeyboardConfirm(callback: (res: { value: string }) => void): void;
    /**
     * 监听监听键盘收起的事件
     * @param callback.res.value 键盘输入的当前值
     */
    function onKeyboardComplete(callback: (res: { value: string }) => void): void;
    /**
     * 取消监听监听键盘收起的事件
     */
    function offKeyboardComplete(callback: (res: { value: string }) => void): void;
    /**
     * 更新键盘，只有当键盘处于拉起状态时才会产生效果
     * 支持版本 >= 2.1.0
     */
    function updateKeyboard(params: types.UpdateKeyboardParams): void;
}

declare namespace wx {
    namespace types {
        interface SetMenuStyleParams extends CallbackParams {
            /**
             * 样式风格
             * @value light 浅色
             * @value dark  深色
             */
            style: "light" | "dark";
        }
        interface Rect {
            /**
             * 宽度
             */
            width: number;
            /**
             * 高度
             */
            height: number;
            /**
             * 上边界坐标
             */
            top: number;
            /**
             * 右边界坐标
             */
            right: number;
            /**
             * 下边界坐标
             */
            bottom: number;
            /**
             * 左边界坐标
             */
            left: number;
        }
    }
    /**
     * 动态设置通过右上角按钮拉起的菜单的样式。
     */
    function setMenuStyle(params: types.SetMenuStyleParams): void;
    /**
     * 获取菜单按钮的布局置信息
     * 支持版本 >= 2.1.0
     */
    function getMenuButtonBoundingClientRect(): types.Rect;
}

declare namespace wx {
    namespace types {
        interface SetStatusBarStyleParams extends CallbackParams {
            /**
             * 样式风格
             * @value white 白色
             * @value black 浅色
             */
            style: "white" | "black",
        }
    }
    /**
     * 当在配置中设置 showStatusBarStyle 时，屏幕顶部会显示状态栏。此接口可以修改状态栏的样式。
     */
    function setStatusBarStyle(params: types.SetStatusBarStyleParams): void;
}

declare namespace wx {
    /**
     * 监听窗口尺寸变化事件
     * @param callback.res.windowWidth 变化后的窗口宽度，单位 px
     * @param callback.res.windowHeight 变化后的窗口高度，单位 px
     */
    function onWindowResize(callback: (res: { windowWidth: number, windowHeight: number }) => void): void;
    /**
     * 取消监听窗口尺寸变化事件
     */
    function offWindowResize(callback: (res: { windowWidth: number, windowHeight: number }) => void): void;
}

declare namespace wx {
    namespace types {
        type RequestMethod = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
        interface RequestParams extends CallbackParams<RequestResponse> {
            /**
             * 开发者服务器接口地址
             */
            url: string;
            /**
             * 请求的参数
             */
            data?: string | { [key: string]: any } | ArrayBuffer;
            /**
             * 设置请求的 header，header 中不能设置 Referer
             * content-type 默认为 application/json
             */
            header?: { [name: string]: string };
            /**
             * HTTP 请求方法
             * @default GET
             */
            method?: RequestMethod;
            /**
             * 返回的数据格式
             * @default json
             * @argument json 返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse
             * @argument 其他 不对返回的内容进行 JSON.parse
             */
            dataType?: "json" | string;
            /**
             * 响应的数据类型
             * 支持版本 >= 1.7.0
             * @default text
             * @argument text 响应的数据为文本
             * @argument arraybuffer 响应的数据为 ArrayBuffer
             */
            responseType?: "text" | "arraybuffer";
        }
        interface RequestResponse extends NetworkResponse, Response {
            /**
             * 开发者服务器返回的数据
             */
            data: any;//string | ArrayBuffer | { [key: string]: any };
            /**
             * 开发者服务器返回的 HTTP Response Header
             * 支持版本 >= 1.2.0
             */
            header: { [key: string]: string };
        }
        interface RequestTask {
            /**
             * 中断请求任务
             */
            abort(): void;
            /**
             * 监听 HTTP Response Header 事件。会比请求完成事件更早
             * 支持版本 >= 2.1.0
             * @param callback HTTP Response Header 事件的回调函数
             * @param callback.res.header 开发者服务器返回的 HTTP Response Header
             */
            onHeadersReceived(callback: (res: { header: any }) => void): void;
            /**
             * 取消监听 HTTP Response Header 事件。会比请求完成事件更早
             * 支持版本 >= 2.1.0
             */
            offHeadersReceived(callback: (res: { header: any }) => void): void;
        }
    }
    /**
     * 发起 HTTPS 网络请求。
     */
    function request(params: types.RequestParams): types.RequestTask;
}

declare namespace wx {
    namespace types {
        interface NetworkFileParams {
            /**
             * 下载资源的 url
             */
            url: string;
            /**
             * HTTP 请求的 Header，Header 中不能设置 Referer
             * download 中必填
             * upload 中选填
             */
            header?: { [key: string]: string };
            /**
             * 指定文件存储的路径
             * 支持版本 >= 1.8.0
             */
            filePath?: string;
        }
        interface NetworkResponse {
            /**
             * 开发者服务器返回的 HTTP 状态码
             */
            statusCode: number;
        }
        interface FileTask extends RequestTask {
            /**
             * 监听下载进度变化事件
             * 支持版本 >= 1.4.0
             * @param callback 下载进度变化事件的回调函数
             * @param callback.res.progress 下载进度百分比
             * @param callback.res.totalBytesWritten 已经下载的数据长度，单位 Bytes
             * @param callback.res.totalBytesExpectedToWrite 预期需要下载的数据总长度，单位 Bytes
             */
            onProgressUpdate(callback: (res: { progress: number, totalBytesWritten: number, totalBytesExpectedToWrite: number }) => void): void;
            /**
             * 取消监听下载进度变化事件
             * 支持版本 >= 2.1.0
             */
            offProgressUpdate(callback: (res: { progress: number, totalBytesWritten: number, totalBytesExpectedToWrite: number }) => void): void;
        }
    }
}

declare namespace wx {
    namespace types {
        interface DownloadFileParams extends NetworkFileParams, CallbackParams<DownloadFileResponse> {
        }
        interface DownloadFileResponse extends NetworkResponse, Response {
            /**
             * 临时文件路径。
             * 如果没传入 filePath 指定文件存储路径，则下载后的文件会存储到一个临时文件
             */
            tempFilePath?: string;
        }
        interface DownloadTask extends FileTask {
        }
    }
    /**
     * 下载文件资源到本地。
     * 客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径。使用前请注意阅读相关说明。
     * 注意：请在服务端响应的 header 中指定合理的 Content-Type 字段，以保证客户端正确处理文件类型。
     */
    function downloadFile(params: types.DownloadFileParams): types.DownloadTask;
}

declare namespace wx {
    namespace types {
        interface UploadFileParams extends NetworkFileParams, CallbackParams<UploadFileResponse> {
            /**
             * 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
             */
            name: string;
            /**
             * HTTP 请求中其他额外的 form data
             */
            formData?: { [key: string]: any };
        }
        interface UploadFileResponse extends NetworkResponse, Response {
            /**
             * 开发者服务器返回的数据
             */
            data: string;
        }
        interface UploadTask extends FileTask {
        }
    }
    /**
     * 将本地资源上传到服务器。
     * 客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data
     */
    function uploadFile(params: types.UploadFileParams): types.UploadTask;
}

declare namespace wx {
    namespace types {
        interface ConnectSocketParams extends CallbackParams {
            /**
             * 开发者服务器 wss 接口地址
             */
            url: string;
            /**
             * HTTP Header，Header 中不能设置 Referer
             */
            header?: { [key: string]: string };
            /**
             * 子协议数组
             * 支持版本 >= 1.4.0
             */
            protocols?: string[];
        }
        interface CloseSocketParams extends CallbackParams {
            /**
             * 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。
             * 如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）
             * @default 1000
             */
            code?: number;
            /**
             * 一个可读的字符串，表示连接被关闭的原因。
             * 这个字符串必须是不长于123字节的UTF-8 文本（不是字符）
             */
            reason?: string;
        }
        type SocketOpenCallback = (res: { header: { [key: string]: string } }) => void;
        type SocketCloseCallBack = () => void;
        type SocketMessageCallback = (res: { data: string | ArrayBuffer }) => void;
        type SocketErrorCallback = (res: Response) => void;
        interface SocketSendParams extends CallbackParams {
            /**
             * 需要发送的内容
             */
            data: string | ArrayBuffer;
        }
        /**
         * 支持版本 >= 1.7.0
         */
        interface SocketTask {
            /**
             * 通过 WebSocket发送数据
             */
            send(params: SocketSendParams): void;
            /**
             * 关闭 WebSocket连接
             */
            close(params: CloseSocketParams): void;
            /**
             * 监听 WebSocket 连接打开事件
             */
            onOpen(callback: SocketOpenCallback): void;
            /**
             * 监听 WebSocket 连接关闭事件
             */
            onClose(callback: SocketCloseCallBack): void;
            /**
             * 监听 WebSocket 错误事件
             */
            onError(callback: SocketErrorCallback): void;
            /**
             * 监听 WebSocket 接受到服务器的消息事件
             */
            onMessage(callback: SocketMessageCallback): void;
        }
    }
    /**
     * 创建一个 WebSocket 连接。
     * 1.7.0 及以上版本，最多可以同时存在 5（小游戏）/2（小程序）个 WebSocket 连接。
     * 1.7.0 以下版本，一个小程序同时只能有一个 WebSocket 连接，如果当前已存在一个 WebSocket 连接，会自动关闭该连接，并重新创建一个 WebSocket 连接。
     */
    function connectSocket(params: types.ConnectSocketParams): types.SocketTask;
    /**
     * 关闭 WebSocket
     */
    function closeSocket(params: types.CloseSocketParams): void;
    /**
     * 监听 WebSocket 连接打开事件
     */
    function onSocketOpen(callback: types.SocketOpenCallback): void;
    /**
     * 监听 WebSocket 连接关闭事件
     */
    function onSocketClose(callback: types.SocketCloseCallBack): void;
    /**
     * 监听 WebSocket 错误事件
     */
    function onSocketError(callback: types.SocketErrorCallback): void;
    /**
     * 监听 WebSocket 接受到服务器的消息事件
     */
    function onSocketMessage(callback: types.SocketMessageCallback): void;
    /**
     * 通过 WebSocket 连接发送数据，需要先 @function connectSocket ，并在 @function onSocketOpen 回调之后才能发送。
     */
    function sendSocketMessage(params: types.SocketSendParams): void;
}

declare namespace wx {
    namespace types {
        interface ShareMenuParams extends CallbackParams {
            /**
             * 是否使用带 shareTicket 的转发
             */
            withShareTicket: boolean;
        }
        interface ShareParams extends CallbackParams {
            /**
             * 转发标题，不传则默认使用当前小游戏的昵称。
             */
            title?: string;
            /**
             * 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。
             * 显示图片长宽比是 5:4
             */
            imageUrl?: string;
            /**
             * 查询字符串，必须是 key1=val1&key2=val2 的格式。
             * 从这条转发消息进入后，可通过 @function onLaunch 或 @function onShow 获取启动参数中的 query。
             */
            query?: string;
        }
        interface GetShareInfoParams extends CallbackParams<GetShareInfoResponse> {
            shareTicket: string;
        }
        interface GetShareInfoResponse extends Response {
            /**
             * 包括敏感数据在内的完整转发信息的加密数据
             */
            encryptedData: string,
            /**
             * 加密算法的初始向量
             */
            iv: string
        }
    }
    /**
     * 显示当前页面的转发按钮
     * 支持版本 >= 1.1.0
     */
    function showShareMenu(params: types.ShareMenuParams): void;
    /**
     * 隐藏转发按钮
     * 支持版本 >= 1.1.0
     */
    function hideShareMenu(params?: types.CallbackParams): void;
    /**
     * 更新转发属性
     * 支持版本 >= 1.2.0
     */
    function updateShareMenu(params: types.ShareMenuParams): void;
    /**
     * 主动拉起转发，进入选择通讯录界面。
     */
    function shareAppMessage(params: types.ShareParams): void;
    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     */
    function onShareAppMessage(callback: () => types.ShareParams): void;
    /**
     * 取消监听用户点击右上角菜单的“转发”按钮时触发的事件
     */
    function offShareAppMessage(callback: () => types.ShareParams): void;
    /**
     * 获取转发详细信息
     */
    function getShareInfo(params: types.GetShareInfoParams): void;
}

declare namespace wx {
    namespace types {
        interface RequestMidasPaymentParams extends CallbackParams {
            /**
             * 支付的类型，不同的支付类型有各自额外要传的附加参数。
             * @argument game - 购买游戏币
             */
            mode: "game",
            /**
             * 环境配置
             * @default 0
             * @argument 0 - 米大师正式环境
             * @argument 1 - 米大师沙箱环境
             */
            env?: 0 | 1,
            /**
             * 在米大师侧申请的应用 id
             */
            offerId: string,
            /**
             * 币种
             * @argument CNY 人民币
             */
            currencyType: "CNY",
            /**
             * 申请接入时的平台，platform 与应用id有关。
             * @argument android
             */
            platform?: "android",
            /**
             * 购买数量。
             * mode = game 时必填。
             * 购买游戏币的时候，buyQuantity 不可任意填写。
             * 需满足 buyQuantity * 游戏币单价 = 限定的价格等级。
             * 如：游戏币单价为 0.1 元，一次购买最少数量是 10。
             * 有效价格等级如下：
             *       价格等级（单位：人民币）
             *       1
             *       3
             *       6
             *       8
             *       12
             *       18
             *       25
             *       30
             *       40
             *       45
             *       50
             *       60
             *       68
             *       73
             *       78
             *       88
             *       98
             *       108
             *       118
             *       128
             *       148
             *       168
             *       188
             *       198
             *       328
             *       648
             */
            buyQuantity?: number,
            /**
             * 分区 ID
             * @default 1
             */
            zoneId?: string,
        }
    }
    /**
     * 发起米大师支付
     * fail.res.errCode 有如下值：
     *      -1	系统失败
     *      -2	支付取消
     *      -15001	虚拟支付接口错误码，缺少参数
     *      -15002	虚拟支付接口错误码，参数不合法
     *      -15003	虚拟支付接口错误码，订单重复
     *      -15004	虚拟支付接口错误码，后台错误
     *      -15006	虚拟支付接口错误码，appId 权限被封禁
     *      -15006	虚拟支付接口错误码，货币类型不支持
     *      -15007	虚拟支付接口错误码，订单已支付
     *       1	虚拟支付接口错误码，用户取消支付
     *       2	虚拟支付接口错误码，客户端错误, 判断到小程序在用户处于支付中时,又发起了一笔支付请求
     *       3	虚拟支付接口错误码，Android 独有错误：用户使用 Google Play 支付，而手机未安装 Google Play
     *       4	虚拟支付接口错误码，用户操作系统支付状态异常
     *       5	虚拟支付接口错误码，操作系统错误
     *       6	虚拟支付接口错误码，其他错误
     *       1000	参数错误
     *       1003	米大师 Portal 错误
     */
    function requestMidasPayment(params: types.RequestMidasPaymentParams): void;
}

declare namespace wx {
    namespace types {
        interface SetStorageParams extends CallbackParams {
            /**
             * 本地缓存中指定的 key
             */
            key: string;
            /**
             * 	需要存储的内容
             */
            data: any;
        }
        interface GetStorageParams extends CallbackParams<GetStorageResponse> {
            /**
             * 本地缓存中指定的 key
             */
            key: string;
        }
        interface GetStorageResponse extends Response {
            /**
             * key对应的内容
             */
            data: any;
        }
        interface RemoveStorageParams extends CallbackParams {
            /**
             * 本地缓存中指定的 key
             */
            key: string;
        }
        interface StorageInfo {
            /**
             * 当前 storage 中所有的 key
             */
            keys: string[];
            /**
             * 当前占用的空间大小, 单位 KB
             */
            currentSize: number;
            /**
             * 限制的空间大小，单位 KB
             */
            limitSize: number;
        }
        interface GetStorageInfoParams extends types.CallbackParams<types.GetStorageInfoResponse> {
        }
        interface GetStorageInfoResponse extends StorageInfo, Response {
        }
    }
    /**
     * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。
     */
    function setStorage(params: types.SetStorageParams): void;
    /**
     * @function setStorage 的同步版本
     * @param key 本地缓存中指定的 key
     * @param data 需要存储的内容
     */
    function setStorageSync(key: string, data: any): void;
    /**
     * 从本地缓存中异步获取指定 key 的内容
     */
    function getStorage(params: types.GetStorageParams): void;
    /**
     * @function getStorage 的同步版本
     */
    function getStorageSync(key: string): any;
    /**
     * 从本地缓存中移除指定 key
     */
    function removeStorage(params: types.RemoveStorageParams): void;
    /**
     * @function removeStorage 的同步版本
     * @param key 本地缓存中指定的 key
     */
    function removeStorageSync(key: string): void;
    /**
     * 清理本地数据缓存
     */
    function clearStorage(params: types.CallbackParams): void;
    /**
     * @function clearStorage 的同步版本
     */
    function clearStorageSync(): void;
    /**
     * 异步获取当前storage的相关信息
     */
    function getStorageInfo(params: types.GetStorageInfoParams): void;
    /**
     * @function getStorageInfo 的同步版本
     */
    function getStorageInfoSync(): types.StorageInfo;
}

declare namespace wx {
    namespace types {
        type AudioSourceType =
            "auto" |                // 自动设置，默认使用手机麦克风，插上耳麦后自动切换使用耳机麦克风，所有平台适用
            "buildInMic" |          // 手机麦克风，仅限 iOS
            "headsetMic" |          // 耳机麦克风，仅限 iOS
            "mic" |                 // 麦克风（没插耳麦时是手机麦克风，插耳麦时是耳机麦克风），仅限 Android
            "camcorder" |           // 同 mic，适用于录制音视频内容，仅限 Android
            "voice_communication" | // 同 mic，适用于实时沟通，仅限 Android
            "voice_recognition";    // 同 mic，适用于语音识别，仅限 Android
        interface GetAvailableAudioSourcesResponse extends Response {
            /**
             * 音频输入源，每一项对应一种音频输入源
             */
            audioSources: types.AudioSourceType[];
        }
        interface SetInnerAudioOptionParams extends CallbackParams {
            /**
             * 是否与其他音频混播，设置为 true 之后，不会终止其他应用或微信内的音乐
             * @default true
             */
            mixWithOther?: boolean;
            /**
             * 是否遵循静音开关，设置为 false 之后，即使是在静音模式下，也能播放声音
             * （仅在 iOS 生效）
             * @default true
             */
            obeyMuteSwitch?: boolean;
        }
        /**
         * InnerAudioContext 实例，可通过 @function createInnerAudioContext 接口获取实例。
         */
        interface InnerAudioContext {
            /**
             * 音频资源的地址
             */
            src: string;
            /**
             * 是否自动播放
             */
            autoplay: boolean;
            /**
             * 是否循环播放
             */
            loop: boolean;
            /**
             * 是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音
             */
            obeyMuteSwitch: boolean;
            /**
             * 当前音频的长度，单位 s。只有在当前有合法的 src 时返回
             */
            readonly duration: number;
            /**
             * 当前音频的播放位置，单位 s。只有在当前有合法的 src 时返回，时间不取整，保留小数点后 6 位
             */
            readonly currentTime: number;
            /**
             * 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
             */
            paused: boolean;
            /**
             * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲
             */
            readonly buffered: number;
            /**
             * 音量。范围 0~1。
             */
            volume: number;

            /**
             * 播放
             */
            play(): void;
            /**
             * 暂停。暂停后的音频再播放会从暂停处开始播放
             */
            pause(): void;
            /**
             * 停止。停止后的音频再播放会从头开始播放。
             */
            stop(): void;
            /**
             * 跳转到指定位置，单位 s
             * @param position 跳转的时间
             */
            seek(position: number): void;
            /**
             * 销毁当前实例
             */
            destroy(): void;
            /**
             * 监听音频进入可以播放状态的事件
             */
            onCanplay(callback: () => void): void;
            /**
             * 取消监听音频进入可以播放状态的事件
             */
            offCanplay(callback: () => void): void;
            /**
             * 监听音频播放事件
             */
            onPlay(callback: () => void): void;
            /**
             * 取消监听音频播放事件
             */
            offPlay(callback: () => void): void;
            /**
             * 监听音频暂停事件
             */
            onPause(callback: () => void): void;
            /**
             * 取消监听音频暂停事件
             */
            offPause(callback: () => void): void;
            /**
             * 监听音频停止事件
             */
            onStop(callback: () => void): void;
            /**
             * 取消监听音频停止事件
             */
            offStop(callback: () => void): void;
            /**
             * 监听音频自然播放至结束的事件
             */
            onEnded(callback: () => void): void;
            /**
             * 取消监听音频自然播放至结束的事件
             */
            offEnded(callback: () => void): void;
            /**
             * 监听音频播放进度更新事件
             */
            onTimeUpdate(callback: () => void): void;
            /**
             * 取消监听音频播放进度更新事件
             */
            offTimeUpdate(callback: () => void): void;
            /**
             * 监听音频播放错误事件
             */
            onError(callback: () => void): void;
            /**
             * 取消监听音频播放错误事件
             */
            offError(callback: () => void): void;
            /**
             * 监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
             */
            onWaiting(callback: () => void): void;
            /**
             * 取消监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
             */
            offWaiting(callback: () => void): void;
            /**
             * 监听音频进行跳转操作的事件
             */
            onSeeking(callback: () => void): void;
            /**
             * 取消监听音频进行跳转操作的事件
             */
            offSeeking(callback: () => void): void;
            /**
             * 监听音频完成跳转操作的事件
             */
            onSeeked(callback: () => void): void;
            /**
             * 取消监听音频完成跳转操作的事件
             */
            offSeeked(callback: () => void): void;
        }
    }
    /**
     * 获取当前支持的音频输入源
     * 支持版本 >= 2.1.0
     */
    function getAvailableAudioSources(params: types.CallbackParams<types.GetAvailableAudioSourcesResponse>): void;
    /**
     * 设置 InnerAudioContext 的播放选项。设置之后对当前小程序全局生效。
     * 支持版本 >= 2.3.0
     */
    function setInnerAudioOption(params: types.SetInnerAudioOptionParams): void;
    /**
     * 创建内部 audio 上下文 @class InnerAudioContext 对象。
     * 支持版本 >= 1.6.0
     */
    function createInnerAudioContext(): types.InnerAudioContext;
}

declare namespace wx {
    namespace types {
        interface ChooseImageParams extends CallbackParams<ChooseImageResponse> {
            /**
             * 最多可以选择的图片张数
             * @default 9
             */
            count?: number;
            /**
             * 所选的图片的尺寸
             * @default ['original', 'compressed']
             * @argument original 原图
             * @argument compressed 压缩图
             */
            sizeType?: ['original'] | ['compressed'] | ['original', 'compressed'];
            /**
             * 选择图片的来源
             * @default ['album', 'camera']
             * @argument album 从相册选图
             * @argument camera 使用相机
             */
            sourceType?: ['album'] | ['camera'] | ['album', 'camera'];
        }
        interface ImageFile {
            /**
             * 本地文件路径
             */
            path: string;
            /**
             * 本地文件大小，单位 B
             */
            size: number;
        }
        interface ChooseImageResponse extends Response {
            /**
             * 图片的本地临时文件路径列表
             */
            tempFilePaths: string[];
            /**
             * 图片的本地临时文件列表
             * 支持版本 >= 1.2.0
             */
            tempFiles: ImageFile[];
        }
        interface PreviewImageParams extends CallbackParams {
            /**
             * 需要预览的图片链接列表。
             * 2.2.3 起支持云文件ID。
             */
            urls: string[],
            /**
             * 当前显示图片的链接，默认为urls的第一张
             */
            current?: string,
        }
        interface SaveImageToPhotosAlbumParams extends CallbackParams {
            /**
             * 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
             */
            filePath: string;
        }
    }
    /**
     * 从本地相册选择图片或使用相机拍照。
     */
    function chooseImage(params: types.ChooseImageParams): void;
    /**
     * 预览图片，调用之后会在新打开的页面中全屏预览传入的图片，预览的过程中用户可以进行保存图片、发送给朋友等操作
     */
    function previewImage(params: types.PreviewImageParams): void;
    /**
     * 保存图片到系统相册。需要用户授权 scope.writePhotosAlbum
     * 支持版本 >= 1.2.0
     */
    function saveImageToPhotosAlbum(params: types.SaveImageToPhotosAlbumParams): void;
}

declare namespace wx {
    namespace types {
        interface StartRecoderParams {
            /**
             * 录音的时长，单位 ms，最大值 600000（10 分钟）
             * @default 60000 （1 分钟）
             */
            duration?: number;
            /**
             * 采样率
             */
            sampleRate: 8000 | 11025 | 12000 | 16000 | 22050 | 24000 | 32000 | 44100 | 48000;
            /**
             * 录音通道数
             */
            numberOfChannels: 1 | 2;
            /**
             * 编码码率
             */
            encodeBitRate: number;
            /**
             * 音频格式
             */
            format: "mp3" | "aac";
            /**
             * 指定帧大小，单位 KB。传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，不指定则不会回调
             */
            frameSize: number;
            /**
             * 指定录音的音频源，可通过 @function getAvailableAudioSources 获取当前可用的音频源
             * @default auto
             */
            audioSource?: AudioSourceType;
        }
        interface RecorderManager {
            /**
             * 开始录音
             */
            start(param: StartRecoderParams): void;
            /**
             * 暂停录音
             */
            pause(): void;
            /**
             * 继续录音
             */
            resume(): void;
            /**
             * 停止录音
             */
            stop(): void;
            /**
             * 监听录音开始事件
             */
            onStart(callback: () => void): void;
            /**
             * 监听录音继续事件
             */
            onResume(callback: () => void): void;
            /**
             * 监听录音暂停事件
             */
            onPause(callback: () => void): void;
            /**
             * 监听录音结束事件
             * @param callback.res.tempFilePath 录音文件的临时路径
             */
            onStop(callback: (res: { tempFilePath: string }) => void): void;
            /**
             * 监听已录制完指定帧大小的文件事件。如果设置了 frameSize，则会回调此事件。
             * @param callback.res.frameBuffer 录音分片数据
             * @param callback.res.isLastFrame 当前帧是否正常录音结束前的最后一帧
             */
            onFrameRecorded(callback: (res: { frameBuffer: ArrayBuffer, isLastFrame: boolean }) => void): void;
            /**
             * 监听录音错误事件
             */
            onError(callback: (res: Response) => void): void;
        }
    }
    /**
     * 获取全局唯一的 RecorderManager
     * 支持版本 >= 1.6.0
     */
    function getRecorderManager(): types.RecorderManager;
}

declare namespace wx {
    namespace types {
        interface CreateVideoParams {
            /**
             * 视频的左上角横坐标
             * @default 0
             */
            x?: number;
            /**
             * 视频的左上角纵坐标
             * @default 0
             */
            y?: number;
            /**
             * 视频的宽度
             * @default 300
             */
            width?: number;
            /**
             * 视频的高度
             * @default 150
             */
            height?: number;
            /**
             * 视频的资源地址
             */
            src: string;
            /**
             * 视频的封面
             */
            poster?: string;
            /**
             * 视频的初始播放位置，单位为 s 秒
             * @default 0
             */
            initialTime?: number;
            /**
             * 视频的播放速率，有效值有 0.5、0.8、1.0、1.25、1.5
             * @default 1.0
             */
            playbackRate?: number;
            /**
             * 视频是否为直播
             * @default false
             */
            live?: boolean;
            /**
             * 视频的缩放模式
             * @default contain
             * @argument fill       - 填充，视频拉伸填满整个容器，不保证保持原有长宽比例
             * @argument contain    - 包含，保持原有长宽比例。保证视频尺寸一定可以在容器里面放得下。因此，可能会有部分空白
             * @argument cover      - 覆盖，保持原有长宽比例。保证视频尺寸一定大于容器尺寸，宽度和高度至少有一个和容器一致。因此，视频有部分会看不见
             */
            objectFit?: "contain" | "cover" | "fill";
            /**
             * 视频是否显示控件
             * @default true
             */
            controls?: boolean;
            /**
             * 视频是否自动播放
             * @default false
             */
            autoplay?: boolean;
            /**
             * 视频是否是否循环播放
             * @default false
             */
            loop?: boolean;
            /**
             * 视频是否禁音播放
             * @default false
             */
            muted?: boolean;
            /**
             * 是否启用手势控制播放进度
             * @default false
             */
            enableProgressGesture?: boolean;
            /**
             * 是否显示视频中央的播放按钮
             * @default false
             */
            showCenterPlayBtn?: boolean;
        }
        interface Video extends CreateVideoParams {
            /**
             * 视频开始缓冲时触发的回调函数
             */
            onwaiting: () => void;
            /**
             * 视频开始播放时触发的回调函数
             */
            onplay: () => void;
            /**
             * 视频暂停时触发的回调函数
             */
            onpause: () => void;
            /**
             * 视频播放到末尾时触发的回调函数
             */
            onended: () => void;
            /**
             * 每当视频播放进度更新时触发的回调函数
             */
            ontimeupdate: () => void;
            /**
             * 视频发生错误时触发的回调函数
             */
            onerror: () => void;
            /**
             * 销毁视频
             */
            destroy(): void;
            /**
             * 监听视频缓冲事件
             */
            onWaiting(callback: () => void): void;
            /**
             * 取消监听视频缓冲事件
             */
            offWaiting(callback: () => void): void;

            /**
             * 监听视频播放事件
             */
            onPlay(callback: () => void): void;
            /**
             * 取消监听视频播放事件
             */
            offPlay(callback: () => void): void;
            /**
             * 监听视频暂停事件
             */
            onPause(callback: () => void): void;
            /**
             * 取消监听视频暂停事件
             */
            offPause(callback: () => void): void;
            /**
             * 监听视频播放到末尾事件
             */
            onEnded(callback: () => void): void;
            /**
             * 取消监听视频播放到末尾事件
             */
            offEnded(callback: () => void): void;
            /**
             * 监听视频播放进度更新事件
             * @param callback.res.position 当前的播放位置，单位为秒
             * @param callback.res.duration 视频的总时长，单位为秒
             */
            onTimeUpdate(callback: (res: { position: number, duration: number }) => void): void;
            /**
             * 取消监听视频播放进度更新事件
             */
            offTimeUpdate(callback: (res: { position: number, duration: number }) => void): void;
            /**
             * 监听视频错误事件
             * @param callback.res.errMsg 错误信息，有如下值
             * @argument MEDIA_ERR_NETWORK - 当下载时发生错误
             * @argument MEDIA_ERR_DECODE  - 当解码时发生错误
             * @argument MEDIA_ERR_SRC_NOT_SUPPORTED - video 的 src 属性是不支持的资源类型
             */
            onError(callback: (res: Response) => void): void;
            /**
             * 取消监听视频错误事件
             */
            offError(callback: (res: Response) => void): void;
            /**
             * 播放视频
             */
            play(): Promise<void>;
            /**
             * 暂停视频
             */
            pause(): Promise<void>;
            /**
             * 停止视频
             */
            stop(): Promise<void>;
            /**
             * 视频跳转
             * @param time 视频跳转到指定位置，单位为 s 秒
             */
            seek(time: number): Promise<void>;
            /**
             * 视频全屏
             */
            requestFullScreen(): Promise<void>;
            /**
             * 视频退出全屏
             */
            exitFullScreen(): Promise<void>;
        }
    }
    /**
     * 创建视频
     */
    function createVideo(params: types.CreateVideoParams): types.Video;
}

declare namespace wx {
    namespace types {
        interface GetLocationParams extends CallbackParams<GetLocationResponse> {
            /**
             * @argument wgs84 返回 gps 坐标
             * @argument gcj02 返回可用于 openLocation 的坐标
             */
            type?: "wgs84" | "gcj02",
            /**
             * 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度	>= 1.6.0
             */
            altitude?: boolean,
        }
        interface GetLocationResponse extends Response {
            /**
             * 纬度
             * @argument 范围为 -90~90，负数表示南纬
             */
            latitude: number;
            /**
             * 经度
             * @argument 范围为 -180~180，负数表示西经
             */
            longitude: number;
            /**
             * 速度，单位 m/s
             */
            speed: number;
            /**
             * 位置的精确度
             */
            accuracy: number;
            /**
             * 高度，单位 m
             */
            altitude: number;
            /**
             * 垂直精度，单位 m（Android 无法获取，返回 0）
             */
            verticalAccuracy: number;
            /**
             * 水平精度，单位 m
             */
            horizontalAccuracy: number;
        }
    }
    /**
     * 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
     */
    function getLocation(params: types.GetLocationParams): void;
}

declare namespace wx {
    namespace types {
        interface Stats {
            /**
             * 文件的类型和存取的权限，对应 POSIX stat.st_mode
             */
            mode: string;
            /**
             * 文件大小，单位：B，对应 POSIX stat.st_size
             */
            size: number;
            /**
             * 文件最近一次被存取或被执行的时间，UNIX 时间戳，对应 POSIX stat.st_atime
             */
            lastAccessedTime: number;
            /**
             * 文件最后一次被修改的时间，UNIX 时间戳，对应 POSIX stat.st_mtime
             */
            lastModifiedTime: number;
            /**
             * 判断当前文件是否一个目录
             */
            isDirectory(): boolean;
            /**
             * 判断当前文件是否一个普通文件
             */
            isFile(): boolean;
        }

        type FileContentEncoding =
            "ascii" |
            "base64" |
            "binary" |
            "hex" |
            "ucs2" | "ucs-2" | "utf16le" | "utf-16le" | //以小端序读取
            "utf-8" | "utf8" |
            "latin1";

        interface RenameParams extends CallbackParams {
            oldPath: string;
            newPath: string;
        }

        interface RmdirParams extends CallbackParams {
            dirPath: string;
            recursive?: boolean;
        }

        interface ReadDirParams extends CallbackParams<ReadDirResponse> {
            dirPath: string;
        }

        interface ReadDirResponse extends Response {
            files: string[];
        }

        interface MkdirParams extends CallbackParams {
            dirPath: string;
            recursive?: boolean;
        }

        interface ReadTextFileParams extends CallbackParams<ReadTextFileResponse> {
            filePath: string;
            encoding: FileContentEncoding;
        }

        interface ReadTextFileResponse extends Response {
            data: string;
        }

        interface ReadBinaryFileParams extends CallbackParams<ReadBinaryFileResponse> {
            filePath: string;
        }

        interface ReadBinaryFileResponse extends Response {
            data: ArrayBuffer;
        }

        interface StatParams extends CallbackParams<StatResponse> {
            path: string;
        }

        interface StatResponse extends Response {
            stat: Stats;
        }

        interface WriteFileParams extends CallbackParams {
            filePath: string;
            data: string | ArrayBuffer;
            encoding?: FileContentEncoding;
        }

        interface UnlinkParams extends CallbackParams {
            filePath: string;
        }

        interface UnzipParams extends CallbackParams {
            zipFilePath: string;
            targetPath: string;
        }

        interface AccessFileParams extends CallbackParams {
            filePath: string;
        }

        interface SavedFileList extends Response {
            fileList: {
                filePath: string;
                size: number;
                createTime: number;
            };
        }

        interface CopyFileParams extends CallbackParams {
            srcPath: string;
            destPath: string;
        }

        interface FileInfoParams extends CallbackParams<FileInfoResponse> {
            filePath: string;
        }

        interface FileInfoResponse extends Response {
            size: number;
        }

        interface RemoveFileParams extends CallbackParams {
            filePath: string;
        }

        interface SaveFileParams extends CallbackParams<SaveFileResponse> {
            tempFilePath: string;
            filePath?: string;
        }

        interface SaveFileResponse extends Response {
            savedFilePath: string;
        }

        interface AppendFileParams extends CallbackParams {
            filePath: string;
            data: string | ArrayBuffer;
            encoding?: FileContentEncoding;
        }

        interface FileSystemManager {
            /**
             * 重命名文件，可以把文件从 oldPath 移动到 newPath
             */
            rename(params: RenameParams): void;
            /**
             * @function rename 的同步版本
             * @param oldPath 源文件路径，可以是普通文件或目录
             * @param newPath 新文件路径
             * @throws 指定源文件或目标文件没有写权限
             * @throws 源文件不存在，或目标文件路径的上层目录不存在
             */
            renameSync(oldPath: string, newPath: string): void;
            /**
             * 删除目录
             */
            rmdir(params: RmdirParams): void;
            /**
             * @function rmdir 的同步版本
             * @param dirPath 要删除的目录路径
             * @param recursive 是否递归删除目录。如果为 true，则删除该目录和该目录下的所有子目录以及文件。
             * @throws 目录不存在, 目录不为空, 指定的 dirPath 路径没有写权限
             */
            rmdirSync(dirPath: string, recursive?: boolean): void;
            /**
             * 读取目录内文件列表
             */
            readdir(params: ReadDirParams): void;
            /**
             * @function readdir 的同步版本
             * @param dirPath 要读取的目录路径
             * @throws 目录不存在
             * @throws dirPath 不是目录
             * @throws 指定的 filePath 路径没有读权限
             */
            readdirSync(dirPath: string): string[];
            /**
             * 创建目录
             */
            mkdir(params: MkdirParams): void;
            /**
             * @function mkdir 的同步版本
             * @param dirPath 创建的目录路径
             * @param recursive 是否在递归创建该目录的上级目录后再创建该目录。
             *                  如果对应的上级目录已经存在，则不创建该上级目录。
             *                  如 dirPath 为 a/b/c/d 且 recursive 为 true，
             *                  将创建 a 目录，再在 a 目录下创建 b 目录，
             *                  以此类推直至创建 a/b/c 目录下的 d 目录。
             *                  支持版本 >= 2.3.0
             * @throws 上级目录不存在
             * @throws 指定的 filePath 路径没有写权限
             * @throws 有同名文件或目录
             */
            mkdirSync(dirPath: string, recursive?: boolean): void;
            /**
             * 删除文件
             */
            unlink(params: UnlinkParams): void;
            /**
             * @function unlink 的同步版本
             * @param filePath 要解链的文件路径
             * @throws 指定的 path 路径没有读权限
             * @throws 文件不存在
             * @throws 传入的 filePath 是一个目录
             */
            unlinkSync(filePath: string): void;
            /**
             * 解压文件
             */
            unzip(params: UnzipParams): void;
            /**
             * 读取本地文件内容
             */
            readFile(params: ReadTextFileParams): void;
            readFile(params: ReadBinaryFileParams): void;
            /**
             * @function readFile 的同步版本
             * @param filePath 要读取的文件的路径
             * @param encoding 指定读取文件的字符编码，如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容
             * @throws 指定的 filePath 所在目录不存在
             * @throws 指定的 filePath 路径没有读权限
             */
            readFileSync(filePath: string): ArrayBuffer;
            readFileSync(filePath: string, encoding: FileContentEncoding): string;
            /**
             * 获取文件 Stats 对象
             */
            stat(params: StatParams): void;
            /**
             * @function stat 的同步版本
             * @param path 文件/目录路径
             * @throws 指定的 path 路径没有读权限
             * @throws 文件不存在
             */
            statSync(path: string): Stats;
            /**
             * 写文件
             */
            writeFile(params: WriteFileParams): void;
            /**
             * @function writeFile 的同步版本
             * @param filePath 要写入的文件路径
             * @param data 要写入的文本或二进制数据
             * @param encoding 指定写入文件的字符编码
             * @throws 指定的 filePath 所在目录不存在
             * @throws 指定的 filePath 路径没有写权限
             */
            writeFileSync(filePath: string, data: string | ArrayBuffer, encoding?: FileContentEncoding): void;
            /**
             * 判断文件/目录是否存在
             */
            access(params: AccessFileParams): void;
            /**
             * @function access 的同步版本
             * @param path 要判断是否存在的文件/目录路径
             * @throws 文件/目录不存在
             */
            accessSync(path: string): void;
            /**
             * 复制文件
             */
            copyFile(params: CopyFileParams): void;
            /**
             * @function copyFile 的同步版本
             * @param srcPath 源文件路径，只可以是普通文件
             * @param destPath 目标文件路径
             * @throws 指定目标文件路径没有写权限
             * @throws 源文件不存在，或目标文件路径的上层目录不存在
             */
            copyFileSync(srcPath: string, destPath: string): void;
            /**
             * 获取该小程序下已保存的本地缓存文件列表
             * @param res.fileList.filePath 本地路径
             * @param res.fileList.size 本地文件大小，以字节为单位
             * @param res.fileList.createTime 文件创建时间
             */
            getSavedFileList(params: CallbackParams<SavedFileList>): void;
            /**
             * 获取该小程序下的 本地临时文件 或 本地缓存文件 信息
             */
            getFileInfo(params: FileInfoParams): void;
            /**
             * 删除该小程序下已保存的本地缓存文件
             */
            removeSavedFile(params: RemoveFileParams): void;
            /**
             * 保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用。
             */
            saveFile(params: SaveFileParams): void;
            /**
             * @function saveFile 的同步版本
             * @param tempFilePath 临时存储文件路径
             * @param filePath 要存储的文件路径
             * @throws 指定的 tempFilePath 找不到文件
             * @throws 指定的 filePath 路径没有写权限
             * @throws 上级目录不存在
             */
            saveFileSync(tempFilePath: string, filePath?: string): string;
            /**
             * 在文件结尾追加内容
             */
            appendFile(params: AppendFileParams): void;
            /**
             * @function appendFile 的同步版本
             * @param filePath 要追加内容的文件路径
             * @param data 要追加的文本或二进制数据
             * @param encoding 指定写入文件的字符编码
             * @throws 指定的 filePath 文件不存在
             * @throws 指定的 filePath 是一个已经存在的目录
             * @throws 指定的 filePath 路径没有写权限
             * @throws 指定的 filePath 是一个已经存在的目录
             */
            appendFileSync(filePath: string, data: string | ArrayBuffer, encoding: FileContentEncoding): void;
        }
    }
    /**
     * 获取全局唯一的文件管理器
     */
    function getFileSystemManager(): types.FileSystemManager;
}

declare namespace wx {
    namespace types {
        interface NavigateToMiniProgramParams extends CallbackParams {
            /**
             * 要打开的小程序 appId
             */
            appId: string;
            /**
             * 打开的页面路径，如果为空则打开首页
             */
            path: string;
            /**
             * 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。
             */
            extraData: any;
            /**
             * 要打开的小程序版本。
             * 仅在当前小程序为开发版或体验版时此参数有效。
             * 如果当前小程序是正式版，则打开的小程序必定是正式版。
             * @value develop    开发版
             * @value trial      体验版
             * @value release    正式版
             */
            envVersion?: "develop" | "trial" | "release";
        }
    }
    /**
     * 打开同一公众号下关联的另一个小程序（注：必须是同一公众号下，而非同个 open 账号下）。
     * 要求在用户发生过至少一次 touch 事件后才能调用。
     * 支持版本 >= 2.2.0
     */
    function navigateToMiniProgram(params: types.NavigateToMiniProgramParams): void;
}

declare namespace wx {
    namespace types {
        interface ButtonStyle {
            /**
             * 左上角横坐标
             */
            left: number;
            /**
             * 左上角纵坐标
             */
            top: number;
            /**
             * 宽度
             */
            width: number;
            /**
             * 高度
             */
            height: number;
            /**
             * 背景颜色
             * 格式#ffffff
             */
            backgroundColor?: string;
            /**
             * 边框颜色
             * 格式#ffffff
             */
            borderColor?: string;
            /**
             * 边框宽度
             */
            borderWidth?: number;
            /**
             * 边框圆角半径
             */
            borderRadius?: number;
            /**
             * 文本的水平居中方式
             */
            textAlign?: "left" | "center" | "right";
            /**
             * 字号
             */
            fontSize?: number;
            /**
             * 文本的行高
             */
            lineHeight?: number;
            /**
             * 按钮显示的层次
             */
            zIndex?: number;
        }
        interface ButtonParams {
            /**
             * 按钮的类型
             */
            type: "text" | "image";
            /**
             * 按钮上的文本，仅当 type 为 text 时有效
             */
            text?: string;
            /**
             * 按钮的背景图片，仅当 type 为 image 时有效
             */
            image?: string;
            /**
             * 按钮的样式
             */
            style: ButtonStyle;
        }
        interface Button {
            /**
             * 显示按钮
             */
            show(): void;
            /**
             * 隐藏按钮
             */
            hide(): void;
            /**
             * 销毁按钮
             */
            destroy(): void;
        }
    }
}

declare namespace wx {
    namespace types {
        interface UserInfoParams {
            /**
             * 是否带上登录态信息。
             * 当 withCredentials 为 true 时，要求此前有调用过 login 且登录态尚未过期，此时返回的数据会包含 encryptedData, iv 等敏感信息；
             * 当 withCredentials 为 false 时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息。
             */
            withCredentials?: boolean;
            /**
             * 描述用户信息的语言
             * @default "en"
             */
            lang?: "en" | "zh_CN" | "zh_TW";
        }
        interface UserInfoButtonParams extends ButtonParams, UserInfoParams {
        }
        interface UserInfoButtonResponse extends GetUserInfoResponse {
        }
        interface UserInfoButton extends UserInfoButtonParams, Button {
            /**
             * 监听监听用户信息按钮的点击事件
             * @param callback 点击事件回调
             */
            onTap(callback: (res: UserInfoButtonResponse) => void): void;
        }
        interface UserInfo {
            /**
             * 用户 openId
             * 只在子域可用
             */
            openId?: string;
            /**
             * 用户昵称
             */
            nickName: string;
            /**
             * 用户头像图片 url
             */
            avatarUrl: string;
            /**
             * 用户性别
             * @argument 0 未知
             * @argument 1 男
             * @argument 2 女
             */
            gender: 0 | 1 | 2;
            /**
             * 用户所在国家
             */
            country: string;
            /**
             * 用户所在省份
             */
            province: string;
            /**
             * 用户所在城市
             */
            city: string;
            /**
             * 显示 country province city 所用的语言
             */
            language: string;
        }
        interface GetUserInfoParams extends UserInfoParams, CallbackParams<GetUserInfoResponse> {
        }
        interface GetUserInfoResponse extends Response {
            /**
             * 用户信息对象，不包含 openid 等敏感信息
             */
            userInfo: UserInfo,
            /**
             * 不包括敏感信息的原始数据字符串，用于计算签名
             */
            rawData: string,
            /**
             * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，
             * 参考文档signature(https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/open-ability/http-signature.html?t=201822)
             */
            signature: string,
            /**
             * 包括敏感数据在内的完整用户信息的加密数据，
             * 详见加密数据解密算法(https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/open-ability/signature.html?t=201822)
             */
            encryptedData: string,
            /**
             * 加密算法的初始向量，
             * 详见加密数据解密算法(https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/open-ability/signature.html?t=201822)
             */
            iv: string,
        }
    }
    /**
     * 创建用户信息按钮
     * 支持版本 >= 2.0.1
     */
    function createUserInfoButton(params: types.UserInfoButtonParams): types.UserInfoButton;
    /**
     * 获取用户信息，withCredentials 为 true 时需要先调用 @function login 接口。需要用户授权 scope.userInfo
     */
    function getUserInfo(params: types.GetUserInfoParams): void;
}

declare namespace wx {
    namespace types {
        interface LoginResponse extends Response {
            /**
             * 用户登录凭证（有效期五分钟）。
             * 开发者需要在开发者服务器后台调用 code2accessToken，使用 code 换取 openid 和 session_key 等信息
             */
            code: string
        }
    }
    /**
     * 通过 login 接口获得的用户登录态拥有一定的时效性。
     * 用户越久未使用小程序，用户登录态越有可能失效。
     * 反之如果用户一直在使用小程序，则用户登录态一直保持有效。
     * 具体时效逻辑由微信维护，对开发者透明。
     * 开发者只需要调用 @function checkSession 接口检测当前用户登录态是否有效。
     * 登录态过期后开发者可以再调用 login 获取新的用户登录态。
     */
    function checkSession(params: types.CallbackParams): void;
    /**
     * 调用接口获取登录凭证（code）进而换取用户登录态信息，包括用户的唯一标识（openid） 及本次登录的 会话密钥（session_key）等。
     * 用户数据的加解密通讯需要依赖会话密钥完成。
     */
    function login(params: types.CallbackParams<types.LoginResponse>): void;
}

declare namespace wx {
    namespace types {
        interface AuthorizeParams extends CallbackParams {
            /**
             * 需要获取权限的 scope
             * @argument userInfo           用户信息        @function getUserInfo
             * @argument userLocation       地理位置        @function getLocation
             * @argument werun 	            微信运动步数    @function getWeRunData
             * @argument writePhotosAlbum   保存到相册      @function saveImageToPhotosAlbum
             */
            scope: string,
        }
    }
    /**
     * 提前向用户发起授权请求。
     * 调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。
     * 如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
     * 支持版本 >= 1.2.0
     */
    function authorize(params: types.AuthorizeParams): void;
}

declare namespace wx {
    namespace types {
        interface OpenDataContext {
            /**
             * 开放数据域和主域共享的 sharedCanvas
             */
            readonly canvas: Canvas;
            /**
             * 向开放数据域发送消息
             * @param message 要发送的消息，message 中及嵌套对象中 key 的 value 只能是 primitive value。即 number、string、boolean、null、undefined。
             */
            postMessage(message: any): void;
        }
    }
    /**
     * 获取开放数据域
     * 支持版本 >= 1.9.92
     */
    function getOpenDataContext(): types.OpenDataContext;
}

declare namespace wx {
    namespace types {
        interface CheckIsUserAdvisedToRestParams extends CallbackParams<CheckIsUserAdvisedToRestResponse> {
            /**
             * 今天已经玩游戏的时间，单位：秒
             */
            todayPlayedTime: number,
        }
        interface CheckIsUserAdvisedToRestResponse extends Response {
            /**
             * 是否建议用户休息
             */
            result: boolean
        }
    }
    /**
     * 根据用户当天游戏时间判断用户是否需要休息
     * 支持版本 >= 1.9.97
     */
    function checkIsUserAdvisedToRest(params: types.CheckIsUserAdvisedToRestParams): void;
}

declare namespace wx {
    namespace types {
        interface FeedbackButtonParams extends ButtonParams {
        }
        interface FeedbackButton extends FeedbackButtonParams, Button {
        }
    }
    /**
     * 用户点击后打开意见反馈页面的按钮
     * 支持版本 >= 2.1.2
     */
    function createFeedbackButton(params: types.FeedbackButtonParams): types.FeedbackButton;
}

declare namespace wx {
    namespace types {
        interface AuthSetting {
            /**
             * 用户信息，对应接口 @function getUserInfo
             */
            "scope.userInfo"?: boolean;
            /**
             * 地理位置，对应接口 @function getLocation  @function chooseLocation
             */
            "scope.userLocation"?: boolean;
            /**
             * 通讯地址，对应接口 @function chooseAddress
             */
            "scope.address"?: boolean;
            /**
             * 发票抬头，对应接口 @function chooseInvoiceTitle
             */
            "scope.invoiceTitle"?: boolean;
            /**
             * 微信运动步数，对应接口 @function getWeRunData
             */
            "scope.werun"?: boolean;
            /**
             * 录音功能，对应接口 @function startRecord
             */
            "scope.record"?: boolean;
            /**
             * 保存到相册 @function saveImageToPhotosAlbum @function saveVideoToPhotosAlbum
             */
            "scope.writePhotosAlbum"?: boolean;
            /**
             * 摄像头 camera
             */
            "scope.camera"?: boolean;
        }
        interface SettingResponse extends Response {
            authSetting: types.AuthSetting;
        }
        interface OpenSettingParams extends ButtonParams {
        }
        interface OpenSettingButton extends OpenSettingParams, Button {
        }
    }
    /**
     * 调起客户端小程序设置界面，返回用户设置的操作结果。设置界面只会出现小程序已经向用户请求过的权限。
     * 支持版本 >= 1.1.0
     * @deprecated
     */
    function openSetting(params: types.CallbackParams<types.SettingResponse>): void;
    /**
     * 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
     * 支持版本 >= 1.2.0
     */
    function getSetting(params: types.CallbackParams<types.SettingResponse>): void;
    /**
     * 创建打开设置页面的按钮
     * 支持版本 >= 2.0.7
     */
    function createOpenSettingButton(params: types.OpenSettingParams): types.OpenSettingButton;
}

declare namespace wx {
    namespace types {
        interface GameClubButtonParams extends ButtonParams {
            /**
             * 游戏圈按钮的图标，仅当 object.type 参数为 image 时有效
             */
            icon: "green" | "white" | "dark" | "light";
        }
        interface GameClubButton extends GameClubButtonParams, Button {
        }
    }
    /**
     * 创建游戏圈按钮。游戏圈按钮被点击后会跳转到小游戏的游戏圈。更多关于游戏圈的信息见 游戏圈使用指南
     * 支持版本 >= 2.0.3
     */
    function createGameClubButton(params: types.GameClubButtonParams): types.GameClubButton;
}

declare namespace wx {
    namespace types {
        interface OpenCustomerServiceConversationParams extends CallbackParams {
            /**
             * 会话来源
             */
            sessionFrom?: string,
            /**
             * 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话之后会收到一个消息卡片，通过以下三个参数设置卡片的内容
             */
            showMessageCard?: boolean,
            /**
             * 会话内消息卡片标题
             */
            sendMessageTitle?: string,
            /**
             * 会话内消息卡片路径
             */
            sendMessagePath?: string,
            /**
             * 会话内消息卡片图片路径
             */
            sendMessageImg?: string,
        }
    }
    /**
     * 进入客服会话，要求在用户发生过至少一次 touch 事件后才能调用。后台接入方式与小程序一致，详见 客服消息接入
     * 支持版本 >= 2.0.3
     */
    function openCustomerServiceConversation(params: types.OpenCustomerServiceConversationParams): void;
}

declare namespace wx {
    namespace types {
        interface GetWeRunDataResponse extends Response {
            /**
             * 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
             */
            encryptedData: string,
            /**
             * 加密算法的初始向量
             */
            iv: string
        }
    }
    /**
     * 获取用户过去三十天微信运动步数，需要先调用 login 接口。
     * 需要用户授权 scope.werun。
     */
    function getWeRunData(params: types.CallbackParams<types.GetWeRunDataResponse>): void;
}

declare namespace wx {
    namespace types {
        interface Card {
            /**
             * 卡券 ID
             */
            cardId: string;
        }
        interface CardOpen extends Card {
            /**
             * 由 wx.addCard 的返回对象中的加密 code 通过解密后得到，解密请参照：code 解码接口
             */
            code: string;
        }
        interface OpenCardParams extends CallbackParams {
            /**
             * 需要打开的卡券列表
             */
            cardList: CardOpen[];
        }
        interface CardExt {
            /**
             * 用户领取的 code，仅自定义 code 模式的卡券须填写，非自定义 code 模式卡券不可填写，详情
             */
            code?: string;
            /**
             * 指定领取者的 openid，只有该用户能领取。 
             * bind_openid 字段为 true 的卡券必须填写，bind_openid 字段为 false 不可填写。
             */
            openid?: string;
            /**
             * 时间戳，东八区时间,UTC+8，单位为秒
             */
            timestamp: number;
            /**
             * 随机字符串，由开发者设置传入，加强安全性（若不填写可能被重放请求）。
             * 随机字符串，不长于 32 位。
             * 推荐使用大小写字母和数字，不同添加请求的 nonce_str 须动态生成，若重复将会导致领取失败。
             */
            nonce_str?: string;
            /**
             * 卡券在第三方系统的实际领取时间，为东八区时间戳（UTC+8,精确到秒）。
             * 当卡券的有效期类为 DATE_TYPE_FIX_TERM 时专用，标识卡券的实际生效时间，用于解决商户系统内起始时间和领取微信卡券时间不同步的问题。
             */
            fixed_begintimestamp?: number;
            /**
             * 领取渠道参数，用于标识本次领取的渠道值。
             */
            outer_str?: string;
            /**
             * 签名，商户将接口列表中的参数按照指定方式进行签名,签名方式使用 SHA1，具体签名方案参见：卡券签名
             */
            signature: string;
        }
        interface CardAdd extends Card {
            cardExt: CardExt;
        }
        interface CardAddResult extends Card {
            /**
             * 加密 code，为用户领取到卡券的code加密后的字符串，解密请参照：code 解码接口
             */
            code: string;
            /**
             * 卡券的扩展参数，结构请参考前文
             */
            cardExt: CardExt;
            /**
             * 是否成功
             */
            isSuccess: boolean;
        }
        interface AddCardParams extends CallbackParams<AddCardResponse> {
            /**
             * 需要添加的卡券列表
             */
            cardList: CardAdd[];
        }
        interface AddCardResponse extends Response {
            /**
             * 卡券添加结果列表
             */
            cardList: CardAddResult[];
        }
    }
    /**
     * 查看微信卡包中的卡券。
     * 只有通过 认证 的小程序或文化互动类目的小游戏才能使用。
     * 更多文档请参考 微信卡券接口文档。
     * 支持版本 >= 2.5.0
     */
    function openCard(parmas: types.OpenCardParams): void;
    /**
     * 批量添加卡券。
     * 只有通过 认证 的小程序或文化互动类目的小游戏才能使用。
     * 更多文档请参考 微信卡券接口文档。
     * 支持版本 >= 2.5.0
     */
    function addCard(params: types.AddCardParams): void;
}

declare namespace wx {
    namespace types {
        interface StartSensorListeningParams extends CallbackParams {
            /**
             * 监听传感器数据回调函数的执行频率
             * @default normal
             * @argument normal   普通的回调频率，在 200ms/次 左右
             * @argument ui       适用于更新 UI 的回调频率，在 60ms/次 左右
             * @argument game     适用于更新游戏的回调频率，在 20ms/次 左右
             */
            interval: "normal" | "ui" | "game";
        }
    }
}

declare namespace wx {
    namespace types {
        /**
         * 监听加速度数据回调函数的执行频率
         * 支持版本 >= 2.1.0
         */
        interface StartAccelerometerParams extends StartSensorListeningParams {
        }
    }
    /**
     * 监听加速度数据
     * 频率：5次/秒，接口调用后会自动开始监听
     * 可使用 @function stopAccelerometer 停止监听。
     */
    function onAccelerometerChange(callback: (res: { x: number, y: number, z: number }) => void): void;
    /**
     * 开始监听加速度数据。
     * 支持版本 >= 1.1.0
     */
    function startAccelerometer(params: types.StartAccelerometerParams): void;
    /**
     * 停止监听加速度数据。
     * 支持版本 >= 1.1.0
     */
    function stopAccelerometer(params?: types.CallbackParams): void;
}

declare namespace wx {
    namespace types {
        interface BatteryInfo {
            /**
             * 设备电量，范围 1 - 100
             */
            level: string;
            /**
             * 是否正在充电
             */
            isCharging: boolean;
        }
        interface GetBatteryInfoResponse extends BatteryInfo, Response {
        }
    }
    /**
     * 获取设备电量
     */
    function getBatteryInfo(params: types.CallbackParams<types.GetBatteryInfoResponse>): void;
    /**
     * @function getBatteryInfo 的同步版本
     * IOS上这个API无法使用
     */
    function getBatteryInfoSync(): types.BatteryInfo;
}

declare namespace wx {
    namespace types {
        interface ClipboardData {
            /**
             * 剪贴板的内容
             */
            data: string;
        }
        interface GetClipboardDataResponse extends ClipboardData, Response {
        }
        interface SetClipboardDataParams extends ClipboardData, CallbackParams {
        }
    }
    /**
     * 取得系统剪贴板的内容
     * 支持版本 >= 1.1.0
     */
    function getClipboardData(params: types.CallbackParams<types.GetClipboardDataResponse>): void;
    /**
     * 设置系统剪贴板的内容
     * 支持版本 >= 1.1.0
     */
    function setClipboardData(params: types.SetClipboardDataParams): void;
}

declare namespace wx {
    /**
     * 监听罗盘数据
     * 频率：5 次/秒，接口调用后会自动开始监听
     * 可使用 @function stopCompass 停止监听。
     * @param callback.res.direction 面对的方向度数
     */
    function onCompassChange(callback: (res: { direction: number }) => void): void;
    /**
     * 开始监听罗盘数据
     * 支持版本 >= 1.1.0
     */
    function startCompass(params?: types.CallbackParams): void;
    /**
     * 停止监听罗盘数据
     * 支持版本 >= 1.1.0
     */
    function stopCompass(params?: types.CallbackParams): void;
}

declare namespace wx {
    namespace types {
        /**
         * 监听陀螺仪数据回调函数的执行频率
         * 支持版本 >= 2.3.0
         */
        interface StartGyroscopeParams extends StartSensorListeningParams {
        }
    }
    /**
     * 监听陀螺仪数据变化事件。
     * 频率根据 @function startGyroscope 的 interval 参数。
     * 可以使用 @function stopGyroscope 停止监听。
     * @param callback 陀螺仪数据变化事件的回调函数
     * @param callback.res.x x 轴的角速度
     * @param callback.res.y y 轴的角速度
     * @param callback.res.z z 轴的角速度
     * 支持版本 >= 2.3.0
     */
    function onGyroscopeChange(callback: (res: { x: number, y: number, z: number }) => void): void;
    /**
     * 开始监听陀螺仪数据
     * 支持版本 >= 2.3.0
     */
    function startGyroscope(param?: wx.types.StartGyroscopeParams): void;
    /**
     * 停止监听陀螺仪数据。
     * 支持版本 >= 2.3.0
     */
    function stopGyroscope(param: wx.types.CallbackParams): void;
}

declare namespace wx {
    namespace types {
        /**
         * 监听设备方向的变化回调函数的执行频率
         * 支持版本 >= 2.3.0
         */
        interface startDeviceMotionListeningParams extends StartSensorListeningParams {
        }
    }
    /**
     * 监听设备方向变化事件。
     * 频率根据 @function startDeviceMotionListening 的 interval 参数。
     * 可以使用 @function stopDeviceMotionListening 停止监听。
     * @param callback 设备方向变化事件的回调函数
     * @param callback.res.alpha 当 手机坐标 X/Y 和 地球 X/Y 重合时，绕着 Z 轴转动的夹角为 alpha，范围值为 [0, 2*PI)。逆时针转动为正。
     * @param callback.res.beta 当手机坐标 Y/Z 和地球 Y/Z 重合时，绕着 X 轴转动的夹角为 beta。范围值为 [-1*PI, PI) 。顶部朝着地球表面转动为正。也有可能朝着用户为正。
     * @param callback.res.gamma 当手机 X/Z 和地球 X/Z 重合时，绕着 Y 轴转动的夹角为 gamma。范围值为 [-1*PI/2, PI/2)。右边朝着地球表面转动为正。
     */
    function onDeviceMotionChange(callback: (res: { alpha: number, beta: number, gamma: number }) => void): void;
    /**
     * 开始监听设备方向的变化
     * 支持版本 >= 2.3.0
     */
    function startDeviceMotionListening(param: wx.types.startDeviceMotionListeningParams): void;
    /**
     * 停止监听设备方向的变化
     * 支持版本 >= 2.3.0
     */
    function stopDeviceMotionListening(params: wx.types.CallbackParams): void;
}

declare namespace wx {
    namespace types {
        interface NetworkType {
            /**
             * 当前是否有网络链接
             */
            isConnected?: boolean;
            /**
             * 网络类型
             * @argument wifi wifi 网络
             * @argument 2g 2g 网络
             * @argument 3g 3g 网络
             * @argument 4g 4g 网络
             * @argument unknown Android 下不常见的网络类型
             * @argument none 无网络
             */
            networkType: "wifi" | "2g" | "3g" | "4g" | "unknown" | "none";
        }
        interface GetNetworkTypeResponse extends NetworkType, Response {
        }
    }
    /**
     * 获取网络类型
     */
    function getNetworkType(params: types.CallbackParams<types.GetNetworkTypeResponse>): void;
    /**
     * 监听网络状态变化事件
     * 支持版本 >= 1.1.0
     */
    function onNetworkStatusChange(callback: (res: types.NetworkType) => void): void;
}

declare namespace wx {
    /**
     * 使手机发生较短时间的振动（15 ms）
     * 支持版本 >= 1.2.0
     */
    function vibrateShort(params?: types.CallbackParams): void;
    /**
     * 使手机发生较长时间的振动（400 ms)
     * 支持版本 >= 1.2.0
     */
    function vibrateLong(params?: types.CallbackParams): void;
}

declare namespace wx {
    /**
     * 监听内存不足告警
     * 当 iOS/Android 向小程序进程发出内存警告时，触发该事件。
     * 触发该事件不意味小程序被杀，大部分情况下仅仅是告警，开发者可在收到通知后回收一些不必要资源避免进一步加剧内存紧张。
     * 支持版本 >= 2.0.0
     * @param callback 内存不足告警事件的回调函数
     * @param callback.res.level 内存告警等级，只有 Android 才有，对应系统宏定义
     * @argument 5 TRIM_MEMORY_RUNNING_MODERATE
     * @argument 10	TRIM_MEMORY_RUNNING_LOW
     * @argument 15	TRIM_MEMORY_RUNNING_CRITICAL
     */
    function onMemoryWarning(callback: (res: { level?: number }) => void): void;
}

declare namespace wx {
    /**
     * 监听横竖屏切换事件
     * 支持版本 >= 2.1.0
     * @param callback 横竖屏切换事件的回调函数
     * @param callback.res.value 表示切换后的屏幕是横屏还是竖屏
     */
    function onDeviceOrientationChange(callback: (res: { value: string }) => void): void;
    /**
     * 取消监听横竖屏切换事件
     * 支持版本 >= 2.1.0
     */
    function offDeviceOrientationChange(callback: (res: { value: string }) => void): void;
}

declare namespace wx {
    namespace types {
        interface ScreenBrightness {
            /**
             * 屏幕亮度值
             * @argument 范围 0 ~ 1，0 最暗，1 最亮
             */
            value: number;
        }
        interface GetScreenBrightnessResponse extends ScreenBrightness, Response {
        }
        interface SetKeepScreenOnParams extends CallbackParams {
            /**
             * 是否保持屏幕常亮
             */
            keepScreenOn: boolean;
        }
        interface SetScreenBrightnessParams extends ScreenBrightness, CallbackParams {
        }
    }
    /**
     * 获取屏幕亮度
     * 若安卓系统设置中开启了自动调节亮度功能，则屏幕亮度会根据光线自动调整，该接口仅能获取自动调节亮度之前的值，而非实时的亮度值。
     * 支持版本 >= 1.2.0
     */
    function getScreenBrightness(params: types.CallbackParams<types.GetScreenBrightnessResponse>): void;
    /**
     * 设置是否保持常亮状态。
     * 仅在当前小程序生效，离开小程序后设置失效。
     * 支持版本 >= 1.4.0
     */
    function setKeepScreenOn(params: types.SetKeepScreenOnParams): void;
    /**
     * 设置屏幕亮度
     * 支持版本 >= 1.2.0
     */
    function setScreenBrightness(params: types.SetScreenBrightnessParams): void;
}

declare namespace wx {
    namespace types {
        interface Worker {
            /**
             * 向主线程或Worker线程发送的消息。
             * @param message 需要发送的消息，必须是一个可序列化的 JavaScript 对象。
             */
            postMessage(message: any): void;
            /**
             * 监听接收主线程/Worker 线程向当前线程发送的消息
             * @param callback.res.message 接收主线程/Worker 线程向当前线程发送的消息
             */
            onMessage(callback: (res: { message: any }) => void): void;
            /**
             * 结束当前 worker 线程，仅限在主线程 worker 对象上调用。
             */
            terminate(): void;
        }
    }
    /**
     * 创建一个 Worker 线程
     * 目前限制最多只能创建一个 @class Worker，创建下一个 @class Worker 前请调用 @function Worker.terminate
     */
    function createWorker(): types.Worker;
}