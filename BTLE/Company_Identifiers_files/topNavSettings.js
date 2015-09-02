var navTimes = {
    ShowDelay: 500,
    HideDelay: 600,
    FadeInDuration: 200,
    FadeOutDuration: 200,
    DiagonalDelay: 1450
}

$(document).ready(function ()
{
    HideShowSecureItems();
    SetHoverEffectKDD();

    UpdateHoverByBrowser();
    ChangeBackColor();
});

$(window).resize(function ()
{
    UpdateHoverByBrowser();
});

function getCookie(name)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

function DownloadFile()
{
    var urlValue = getCookie('url');
    if (urlValue != null && urlValue != '' && urlValue != undefined)
    {
        window.location = urlValue;
    }
    eatCookie('url');
}

function ChangeBackColor()
{
    var pageUrl = window.location.toString();
    var searchPage = 'osssearchresults';
    if (pageUrl.split('/').length > 4)
    {
        divId = getCookie('selectDiv');
        if (divId != null)
        {
            $('#' + divId + ' > a').css('background', '#666');
        }
    }
    else
    {
        setRootCookie('selectDiv', null, 1);
    }

    if (pageUrl.indexOf(searchPage) != -1)
    {
        setRootCookie('selectDiv', null, 1);
    }

    // When you Select on Top Link change the Back Color.
    $('#menu > div').click(function ()
    {
        var selectedDivId = this.id;
        setRootCookie('selectDiv', selectedDivId, 1);
    });

    // When you Click any Link Under TopNav Change the Back Color for TopNav.
    $('.hover').click(function ()
    {
        var selectedDivId = this.id;
        selectedDivId = selectedDivId.replace('data', '');
        setRootCookie('selectDiv', selectedDivId, 1);
    });
}

function setRootCookie(c_name, value, exdays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    c_value += "; path=/";
    document.cookie = c_name + "=" + c_value;
}

function eatCookie(c_name)
{
    document.cookie = encodeURIComponent(c_name) + "=deleted; expires=" + new Date(0).toUTCString();
    // setMaxAge(0) will delete the Cookie Perm.
}


function UpdateHoverByBrowser() {
    //var leftPos = $('#1').offset().left;
    var leftPos = $('#menu div:first-child').offset().left;
    $('.hover').css('left', leftPos);
}

function SetHoverEffectKDD()
{
    var menuDisplayer = MenuDisplayer();
    menuDisplayer.HideMenuNow(false, true);
    var data = 'data';

    $("#menu > div").each(function ()
    {
        var id = this.id;
        // Set up the handler for when the mouse hovers over a top-level link ('Members', 'News & Events', etc.)
        $('#' + id).mouseenter(function ()
        {
            $('#menu').focus();
            if ($('#' + id + 'data > div > div').html() == undefined) // If there is no Data in First Col's First Div don't Show Hover.
            {
                menuDisplayer.HideMenuNow(false, true);
            }
            else
            {
                menuDisplayer.ShowMenu(id);
            }
        });
    });

    $("#topNav").mouseleave(function ()
    {
        menuDisplayer.HideMenu();
    });

    $(".hover").mouseenter(function ()
    {
        menuDisplayer.CancelDelayTimer();
        menuDisplayer.CancelDiagonalTimer();
    });

    $('.hover').mouseleave(function ()
    {
        menuDisplayer.HideMenu();
    });

    function MenuDisplayer()
    {
        return {
            delayTimerId: 0,
            diagonalTimerId: 0,
            waitingId: 0,
            visibleId: 0,

            ShowMenu: function (id)
            {
                // If the mouse moved to a different menu header and the diagonal timer is not running, show the next menu item.
                if (this.visibleId != id && this.diagonalTimerId == 0)
                {
                    this.CancelDelayTimer();
                    this.waitingId = 0;
                    var self = this;
                    if (this.visibleId != 0)
                    {
                        // The menu is already shown, so hide and show the next menu item immediately.
                        self.HideMenuNow(false, false);
                        self.ShowMenuNow(id, false);
                    }
                    else
                    {
                        // Show menu with a delay.
                        this.delayTimerId = window.setTimeout(function () { self.ShowMenuNow(id, true); }, navTimes.ShowDelay);
                    }
                }
                else
                {
                    this.CancelDelayTimer();
                    this.waitingId = id;
                }
            },

            ShowMenuNow: function (id, useFade)
            {
                if (this.visibleId != id)
                {
                    var idData = id + "data";
                    useFade ? $('#' + idData).fadeIn(navTimes.FadeInDuration) : $('#' + idData).show();

                $('.navTab > a').css('background', '#333');
                ChangeBackColor();
                $('#' + id + ' > a').css('background', '#ff6600');

                    var maxColumnHeight = $('#' + idData).height();
                    $('#' + idData + ' > div').each(function ()
                    {
                    $(this).css('height', maxColumnHeight);
                });

                    this.visibleId = id;
                    var self = this;
                    this.diagonalTimerId = window.setTimeout(function () { self.DiagonalTimerEnd(); }, navTimes.DiagonalDelay);
            }
            },

            HideMenu: function ()
            {
                this.CancelDelayTimer();
                this.CancelDiagonalTimer();
                var self = this;
                this.delayTimerId = window.setTimeout(function () { self.HideMenuNow(true, false); }, navTimes.HideDelay);
            },

            HideMenuNow: function (useFade, force)
            {
                if (this.visibleId > 0 || force)
                {
                    if (useFade)
                    {
                        $('.hover').fadeOut(navTimes.FadeOutDuration);
        $('.navTab > a').css('background', '#333');
        ChangeBackColor();
                    }
                    else
                    {
        $('.hover').hide();
                    }
                    this.visibleId = 0;
}
            },

            CancelDelayTimer: function ()
            {
                if (this.delayTimerId != 0)
                {
                    window.clearTimeout(this.delayTimerId);
                }

                this.delayTimerId = 0;
            },

            CancelDiagonalTimer: function ()
            {
                if (this.diagonalTimerId != 0)
                {
                    window.clearTimeout(this.diagonalTimerId);
                }
                this.diagonalTimerId = 0;
                this.waitingId = 0;
            },

            DiagonalTimerEnd: function ()
            {
                this.diagonalTimerId = 0;
                if (this.waitingId != 0)
                {
                    this.ShowMenu(this.waitingId);
                }
            }
        }
    }
}

function HideShowSecureItems()
{
    var flag = 1; // Flag for Site Map Show and Hide.
    var signIn = $('.ms-signInLink').html();
    var access = getCookie('Access');
    var urlValue = window.location.toString().split('/')[2];
    if (urlValue.indexOf(".") != -1)
    {
        if (access == 'Granted')
        {
            $('.secureItem').show();
        }
        else
        {
            $('.secureItem').hide();
            flag = 0;
        }
    }
    else
    {
        if (signIn == null)
        {
            $('.secureItem').show();
        }
        else
        {
            $('.secureItem').hide();
            flag = 0;
        }
    }

    // Hidding the LI from the SiteMap they are not Visible.
    var sMap = $('#siteMap').html();
    if (sMap != null)
    {
        if (flag != 1)
        {
            $('.secureItem').parent('li').css('display', 'none');
        }
    }
}

function HideDivBorder(obj)
{
    var iddata = obj.id + 'data';
    var i = 0;
    var k = 0;
    var iList = new Array();
    $('#' + iddata + '> div').each(function ()
    {
        if (!$(this).html())
        {
            iList[k] = i;
            k++;
        }
        else
        {
            // Check if there is all Data's in that Div has Secure a href then Consider that Column as hidden. 
        }
        i++;
    });

    for (i = 0; i < iList.length; i++)
    {
        var val = iList[i];
        if (val == 0)
        {
            $('.columnOne').css('border-right', 'none');
        }
        else if (val == 1)
        {
            $('.columnOne').css('border-right', 'none');
        }
        else if (val == 2)
        {
            $('.columnTwo').css('border-right', 'none');
        }
        else if (val == 3)
        {
            $('.columnThree').css('border-right', 'none');
        }
    }
}

function ResetDivBorder()
{
    $('.columnOne').css('border-right', '1px solid #666');
    $('.columnTwo').css('border-right', '1px solid #666');
    $('.columnThree').css('border-right', '1px solid #666');
}