declare var smartCaptcha: SmartCaptcha.SmartCaptchaApi;

declare namespace SmartCaptcha {
  // Event subscription types for SmartCaptcha
  interface Subscription {
    event:
      | 'challenge-visible'
      | 'challenge-hidden'
      | 'network-error'
      | 'token-expired'
      | 'success'
      | 'javascript-error';
    data?: string | JavascriptErrorData;
  }

  // Type for events that can be subscribed to
  type SubscribeEvent = Subscription['event'];

  // Widget ID type for SmartCaptcha
  type WidgetId = number;

  // Token type returned by SmartCaptcha
  type Token = string;

  // Unsubscribe function type
  type Unsubscribe = () => void;

  type ShieldPosition =
    | 'top-left'
    | 'center-left'
    | 'bottom-left'
    | 'top-right'
    | 'center-right'
    | 'bottom-right';

  // JavaScript error details returned by the "javascript-error" event
  interface JavascriptErrorData {
    filename: string;
    message: string;
    col: number;
    line: number;
  }

  // Parameters for rendering the SmartCaptcha widget
  interface RenderParams {
    /**
     * Your site's SmartCaptcha key.
     */
    sitekey: string;

    /**
     * Optional. Callback function executed upon successful CAPTCHA validation.
     * @param token The token returned by SmartCaptcha.
     */
    callback?: (token: string) => void;

    /**
     * Optional. Language for CAPTCHA. Supported languages include: 'ru', 'en', 'be', 'kk', 'tt', 'uk', 'uz', 'tr'.
     */
    hl?: 'ru' | 'en' | 'be' | 'kk' | 'tt' | 'uk' | 'uz' | 'tr';

    /**
     * Optional. Whether the CAPTCHA should be invisible.
     * @default false
     */
    invisible?: boolean;

    /**
     * Optional. Enable test mode for CAPTCHA. The user will always receive a task. Use this property for debugging and testing purposes only.
     * @default false
     */
    test?: boolean;

    /**
     * Optional. Whether the CAPTCHA is running inside a webview.
     * @default false
     */
    webview?: boolean;

    /**
     * Optional. Whether the CAPTCHA is running inside a webview.
     * @default false
     */

    /**
     * Optional. Set CAPTCHA shield position.
     */
    shieldPosition?: ShieldPosition;

    /**
     * Optional. Whether to hide the CAPTCHA shield.
     * @default false
     */
    hideShield?: boolean;
  }

  // SmartCaptcha API interface for interacting with the CAPTCHA
  interface SmartCaptchaApi {
    /**
     * Renders the specified container as a SmartCaptcha widget and returns the widget ID.
     * @param container The HTML element or its ID to render the CAPTCHA in.
     * @param params Parameters for rendering the CAPTCHA.
     * @returns The ID of the created widget.
     */
    render(container: HTMLElement | string, params: RenderParams): WidgetId;

    /**
     * Resets the CAPTCHA state.
     * @param widgetId Optional. The ID of the widget to reset. Defaults to the first widget if not specified.
     */
    reset(widgetId?: WidgetId): void;

    /**
     * Destroys the SmartCaptcha widget.
     * @param widgetId Optional. The ID of the widget to destroy. Defaults to the first widget if not specified.
     */
    destroy(widgetId?: WidgetId): void;

    /**
     * Programmatically triggers CAPTCHA verification.
     * @param widgetId Optional. The ID of the widget to execute. Defaults to the first widget if not specified.
     */
    execute(widgetId?: WidgetId): void;

    /**
     * Displays an error message in the CAPTCHA widget.
     * @param widgetId Optional. The ID of the widget where the error should be displayed.
     */
    showError(widgetId?: WidgetId): void;

    /**
     * Subscribes to an event on the SmartCaptcha widget.
     * @param widgetId The ID of the widget to subscribe to.
     * @param event The event to subscribe to (e.g., 'success', 'token-expired', etc.).
     * @param fn The function to be executed when the event occurs.
     * @returns A function to unsubscribe from the event.
     */
    subscribe(
      widgetId: WidgetId,
      event: SubscribeEvent,
      fn: (...args: unknown[]) => void
    ): Unsubscribe;

    /**
     * Retrieves the response token for the specified widget.
     * @param widgetId Optional. The ID of the widget to get the response from. Defaults to the first widget if not specified.
     * @returns The response token or undefined if no token exists.
     */
    getResponse(widgetId?: WidgetId): string | undefined;

    // SmartCaptcha state properties
    _origin: string;
    _test: boolean;
    _webview: boolean;
  }
}
