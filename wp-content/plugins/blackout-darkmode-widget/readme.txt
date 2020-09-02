=== Blackout: Dark Mode Widget ===
Contributors: josesotelocohen, sandoche
Donate link: https://compras.inboundlatino.com/blackout/
Tags: dark, dark mode, dark mode widget, darkmode, darkmode widget
Requires at least: 4.7
Tested up to: 5.5
Requires PHP: 5.4
Stable tag: 2.0.4
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

A plugin that creates a widget that enables dark mode on click.


== Description ==


A simple solution to allow your users to enable/disable dark mode on your website.

It creates a widget that your users can use to toggle between normal and dark modes.

It uses the CSS mix-blend-mode to bring dark-mode to any of your websites.

Sandoche made the widget and, it has a standalone version that allows you to implement it on your website by copy+pasting a simple JavaScript script, you can find more about that by [clicking here](https://darkmodejs.learn.uno/).

**Do you have an issue or a feature request?**

Please submit it in our [Github Repo](https://github.com/JoseSoteloCohen/Blackout-WordPress-Dark-mode-Widget/issues)

**Want to receive updates on your email?**

[Yes, I want!](https://sendfox.com/lp/1jovzq)

**Want to use your own widget or element as toggle?**

Go to the Blackout settings page, and mark the last checkbox with the label **Want to use your own toggle widget or button?**, then add the class `darkmode-enable` to the element that you want to use as toggle.


== Installation ==

= Minimum Requirements =

* WordPress 4.7 or greater
* PHP version 5.4 or greater
* MySQL version 5.0 or greater

= We recommend your host supports: =

* PHP version 7.0 or greater
* MySQL version 5.6 or greater
* WordPress Memory limit of 64 MB or greater (128 MB or higher is preferred)


= Installation =

1. Install using the WordPress built-in Plugin installer, or extract the zip file and drop the contents in the `wp-content/plugins/` directory of your WordPress installation.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Go to settings > Blackout to customize the configurations of the widget (optional).


== Frequently Asked Questions ==

**Why do I need this plugin?**

Because it's the easiest way to add dark mode to your WordPress website.

**Do I need to know how to code to use Blackout?**

No, you don't and that's the main reason that I created this plugin, so you can integrate a dark mode solutions without touching any code.

**Why it doesn't work in all browsers?**

This widget uses the CSS mix-blend-mode: difference; in order to provide the dark mode. It may not be compatible with all the browsers.

Check the compatibility here: [https://caniuse.com/#search=mix-blend-mode](https://caniuse.com/#search=mix-blend-mode)

**Can I use my own widget or element as toggle?**

Yes, to do it you just need to go to the Blackout settings page, and mark the last checkbox with the label **Want to use your own toggle widget or button?**, then add the class `darkmode-enable` to the element that you want to use as toggle.


== Screenshots ==

1. **Positioning**: Edit the position fields to customize the widget positioning.
2. **Middle Right**: By changing the button input to 50% you can place the widget at the middle of the screen, in the right side.
3. **Sizes**: You can make the widget and icon bigger or smaller by using the range inputs in the settings.
4. **Bigger**: widget and icon on the left side of the screen** You can change the position and size of the widget.


== Changelog ==

= 2.0.4 - 2020-08-22 =

* Fixed issue with the custom toggle.
* Now the background color won't be change when darkmode isn't active.

= 2.0.3 - 2020-08-15 =

* Replaced all the jQuery with vanilla JavaScript.

= 2.0.2 - 2020-08-14 =

* Modified how the sizes work, changes from rem to px.

= 2.0.1 - 2020-08-08 =

* Fixed the Cookies and Match OS features. Many thanks to @phillipjohnston

= 2.0.0 - 2020-07-04 =
* **New Feature** Now you can use your own widget or element by enabling the option in the settings page then adding the class `darkmode-enable` to the element that you want to use as toggle.
* NOW ADDING PX AT YOUR POSITIONS IS MANDATORY!!!

= 1.3.0 - 2019-08-22 =
* **New Feature** Now you can enable or disable the creation of cookies and the match OS features.

= 1.2.0 - 2019-08-13 =
* Darkmode now detects automatically when the OS is using dark mode (if the browsers supports prefers-color-scheme).

= 1.1.0 - 2019-07-30 =
* **New Feature:** Added pre-defined positions for people that don't want to tinker the custom settings.
* **Bug fix**: Now the .darkmode-ignore class is added and removed on toggle, this way the items that you add the class manually won't have the mix-blend-mode:difference CSS style applied to them when not in dark mode.
* Re-organized the settings page.

= 1.0.2 - 2019-07-08 =
* **Bug fix**: Solved a bug where the darkmode-ignore class wasn't being removed when toggling or being in "light-mode"

= 1.0.1 - 2019-07-07 =
* **New Feature:** Added a checkbox so you can choose if the widget is shown in all pages or only in posts.
* Now it ignores all iframes and images.

= 1.0.0 - 2019-06-28 =
* Initial Release
