function $_global_calloutusagecontrolscript(){SP.SOD.executeFunc("clienttemplates.js","SPClientTemplates.TemplateManager.RegisterTemplateOverrides",_calloutUsageControlStartup);typeof Sys!="undefined"&&Sys!=null&&Sys.Application!=null&&Sys.Application.notifyScriptLoaded();typeof NotifyScriptLoadedAndExecuteWaitingJobs=="function"&&NotifyScriptLoadedAndExecuteWaitingJobs("CalloutUsageControlScript.js")}function ULSv1j(){var a={};a.ULSTeamName="DLC Server";a.ULSFileName="CalloutUsageControlScript.commentedjs";return a}function _calloutUsageControlStartup(){a:;var a={};a.Templates={};a.BaseViewID="Callout";a.Templates.OnPostRender=function(a){a:;var b=GetCalloutElementIDFromRenderCtx(a);SP.SOD.executeFunc("sp.js","SP.ClientContext",function(){a:;SP.SOD.executeFunc("sp.search.apps.js","Microsoft.SharePoint.Client.Search.Analytics.UsageAnalytics",function(){a:;var c=new SP.ClientContext.get_current,g=c.get_web().get_lists().getByTitle(a.ListTitle),f=g.getItemById(a.CurrentItem.ID),h=Microsoft.SharePoint.Client.Search.Analytics.UsageAnalytics.newObject(c,c.get_site()),e=h.getAnalyticsItemData(1,f),d=Function.createDelegate(this,function(d,b){a:;var c=typeof b.get_message!="undefined"&&b.get_message!=null?b.get_message():b.message;SP.ULS.log("Failed to get view count for item at:"+a.CurrentItem.FileLeafRef+" due to:"+c)});c.load(e);c.executeQueryAsync(Function.createDelegate(this,function(f){a:;var a=document.getElementById(b+"-Usage");if(typeof a!="undefined"&&a!=null)try{var c=STSHtmlEncode(e.get_totalHits());SP.SOD.executeFunc("strings.js","Strings.CMS",function(){a:;if(parseInt(c)>1e4){a.innerHTML=String.format(SP.Utilities.LocUtility.getLocalizedCountValue(Strings.CMS.L_Callout_Usage_Count,Strings.CMS.L_Callout_Usage_CountIntervals,c),Strings.CMS.L_Callout_Usage_Count_Max);a.removeAttribute("style")}else if(c!="0"){a.innerHTML=String.format(SP.Utilities.LocUtility.getLocalizedCountValue(Strings.CMS.L_Callout_Usage_Count,Strings.CMS.L_Callout_Usage_CountIntervals,c),c);a.removeAttribute("style")}})}catch(g){d(f,g)}}),d)})})};SPClientTemplates.TemplateManager.RegisterTemplateOverrides(a)}$_global_calloutusagecontrolscript();