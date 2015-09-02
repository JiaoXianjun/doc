$(document).ready(function ()
{
    UpdateDocTitle(); // Update the Title of the Document.
    HideTaxonomyValues(); // Hide Taxonomy Values.
    HideOnSearchPage(); // Hide things on Search Result Page.
    HideSettingsBanner(); // Hide SharePoint Banners.
    AdjustFooter();
    UpdateLogo();
    AdjustLoginButton();
    AdjustAsideRight();
    ChangeSharePointToBluetooth();
    AdjustForChrome();
});

function ChangeSharePointToBluetooth()
{
    try
    {
        $('.ms-core-brandingText').html("Bluetooth");
    }
    catch (x) { } // This will never Execute.
}

function HideTaxonomyValues()
{
    if ($('.myTaxonomy > span').html() != null)
    {
        $('.myTaxonomy').hide();
    }
}

function HideSettingsBanner()
{
    var currentPageUrl = window.location.toString(); // equals = location.href;
    if (currentPageUrl.split('/')[2].indexOf(".") == -1)
    {
        ShowSharePointBanner(); // For development, take this out of the if block. 
    }
    else
    {
        HideWelcomeBox();
        HideSignInButton();
    }
}

function HideOnSearchPage()
{
    var currentPageUrl = window.location.toString();
    var searchPage = 'osssearchresults.aspx';
    if (currentPageUrl.indexOf(searchPage) != -1)
    {
        $('#suiteBar').hide();
        $('#s4-ribbonrow').hide();
        $('#DeltaTopNavigation').hide();

        $("#favicon")[0].href = '/_layouts/15/images/BluetoothUtilities/BluetoothFavIcon.ico';
    }
}

function HideWelcomeBox()
{
    try
    {
        $('#welcomeMenuBox').hide();
    }
    catch (x) { } // This will never Executed but Just in Case.
}

function ShowSharePointBanner()
{
    $('#ms-designer-ribbon').show();
    ShowSignInButton();
}

function ShowSignInButton()
{
    $('.ms-signInLink').show();
}

function HideSignInButton()
{
    $('.ms-signInLink').hide();
}

function UpdateDocTitle()
{
    var title = document.title;
    if (!title || title === " ")
    {
        title = 'Login Failed!';
        HideErrorMsg();
    }
    else
    {
        title = title.replace('Pages -', '');
        title = title.replace('&amp;', '&');
        title = title.replace('English', '');
        title = title.replace('Korean', '');
        title = title.replace('Japanese', '');
        title = title.replace('Chinese', '');

        var pageUrl = window.location.toString();
        var searchPage = 'osssearch';
        if (pageUrl.indexOf(searchPage) != -1)
        {
            title += 'Search';
        }
    }

    title += ' | Bluetooth Technology Special Interest Group';
    document.title = title;
}

function AdjustFooter()
{
    var minHeight = $(window).height() - 320;
    if (minHeight > 560 && minHeight < 590)
    {
        minHeight += 65;
    }
    $('#mainContent').css('min-height', minHeight + 'px');
}

function UpdateLogo()
{
    var pageUrl = window.location.toString();
    var searchPage = 'osssearchresults';
    if (pageUrl.indexOf(searchPage) == -1)
    {
        var eng = '/en-us';
        var kor = '/ko-kr';
        var zhs = '/zh-cn';
        var jap = '/ja-jp';
        var logoA = $('#header > a');
        if (pageUrl.indexOf(eng) != -1)
        {
            logoA[0].href = eng;
        }
        else if (pageUrl.indexOf(jap) != -1)
        {
            logoA[0].href = jap;
        }
        else if (pageUrl.indexOf(kor) != -1)
        {
            logoA[0].href = kor;
        }
        else if (pageUrl.indexOf(zhs) != -1)
        {
            logoA[0].href = zhs;
        }
    }
}

function IsIE(version, comparison) // comparison can be 'gt', 'gte', 'lt' or 'lte'
{
    var $span = $('<span>').html('<!--[if ' + (comparison || '') + ' IE ' + (version || '') + ']><a></a><![endif]-->');
    var ieTest = $span.find('a').length > 0;
    $span.remove();
    return ieTest;
}

function AdjustLoginButton()
{
    if (IsIE(8))
    {
        $('.loginButton').css('margin-left', '150px'); // from inline 47px
        $('.loginButton').css('margin-top', '-22px'); // from inline 3px
    }
}

function AdjustAsideRight()
{
    var url = location.href;
    if (url.indexOf("/_layouts/15/") != -1
        || url.indexOf("/_catalogs") != -1
        || url.indexOf("/Lists/") != -1
        || url.indexOf("/Forms/") != -1
        || url.indexOf('/AllItems.aspx') != -1)
    {
        if (url.indexOf('/Events/') == -1)
        {
            try
            {
                $('#asideRight').hide();
                $('#divPlaceHolderMain').css('width', '100%');
                $('#topNav').css('visibility', 'hidden');
            }
            catch (x) { } // This will never Happend - Just In Case. 
        }
    }
}

function HideErrorMsg()
{
    $('.uname').keypress(function ()
    {
        $('.btErrMsg').css('display', 'none');
    });
    $('.pword').keypress(function ()
    {
        $('.btErrMsg').css('display', 'none');
    });
}

(function ($) {
    $.QueryString = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

function AdjustForChrome()
{
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1 && window.location.href.indexOf('searchresults.aspx') > -1)
    {
        $('.cBody')[0].style['overflow'] = 'visible';
    }
}