$(document).ready(function() {
	//Determine if user is on course results page, with results via DOM elements unique to that page.
	var searchPage = document.getElementById('listContainer_nav_batch_top') && document.getElementsByName('courseInfoSearchText').length;
	if (searchPage) {




		var innerDoc = document;
		var iframe = document.getElementById('contentFrame');
		if (iframe)
		 	innerDoc= iframe.contentDocument || iframe.contentWindow.document; //Depending on how you arrived at the course results page, the document we are trying to modify MAY be in an iframe.


		var bbURL = 'https://cupo.blackboard.com';

		function createNav(title,callback) {
			var opt = innerDoc.createElement('li');
			var opt_a = innerDoc.createElement('a');
			opt.setAttribute('class','sub');
			opt_a.setAttribute('class','customButton');
			opt_a.setAttribute('href','#');
			opt_a.addEventListener("click", callback);
			opt_a.innerHTML = title;
			opt.appendChild(opt_a);
			topUL.appendChild(opt);
		}

		function getCIDs() {
			var stuff = innerDoc.getElementsByTagName('a');
			var URLs = [];
			for (var i = 0; i < stuff.length; i++) { 
				var href = stuff[i].getAttribute('href');
				if (href) {
					if (href.indexOf("courseMain?course_id") > -1) {
					
						if (stuff[i].parentNode.parentNode.children[0].children[0].checked) {
							console.log(stuff[i]);
							var split = href.split('_');
							var cid = '_' + split[2] + '_' + split[3];
							var crn = stuff[i].innerHTML;
							URLs.push([href,cid,crn]);
						}
					}

				}
			}
			return URLs
		}


		function openCourses() {
			var ids = getCIDs();
			ids.forEach(function(u) {window.open(u[0], '_blank');});
		}

		function editCourses() {
			var ids = getCIDs();
			ids.forEach(function(u) {
				var url = bbURL + '/webapps/blackboard/execute/editCourseManager?sourceType=COURSES&context=MODIFY&course_id=' + u[1];
				window.open(url, '_blank');
			});
		}

		function enrollCourses() {
			var ids = getCIDs();
			ids.forEach(function(u) {
				var url = bbURL + '/webapps/blackboard/execute/courseEnrollment?sourceType=COURSES&course_id=' + u[1];
				window.open(url, '_blank');
			});
		}

		function uploadFile() {
			var ids = getCIDs();
			ids.forEach(function(u) {
				var url = bbURL + '/webapps/cmsmain/webui/courses/' + u[2] + '?action=upload&subaction=uploadFiles&gobackto=%2Fcourses%2F' + u[2];
				window.open(url, '_blank');
			});
		}

		function contentCollection() {
			var ids = getCIDs();
			ids.forEach(function(u) {
				var url = bbURL + '/webapps/cmsmain/webui/courses/' + u[2] + '?action=frameset&subaction=view';
				window.open(url, '_blank');
			});
		}

		function dueDates() {
			var ids = getCIDs();
			ids.forEach(function(u) {
				var url = bbURL + '/webapps/date-management/daterollover/showDateRollover?action=display&course_id=' + u[1];
				window.open(url, '_blank');
			});
		}

		function gradeCenterDL() {
			var ids = getCIDs();
			ids.forEach(function(u) {
				var url = bbURL + '/webapps/gradebook/do/instructor/downloadGradebook?dispatch=viewDownloadOptions&course_id=' + u[1];
				window.open(url, '_blank');
			});
		}



		var topUL = innerDoc.getElementById('listContainer_nav_batch_top');
		var spacer = innerDoc.createElement('li');
		spacer.setAttribute('style','width: 50px;');
		topUL.appendChild(spacer);


		createNav('Open',openCourses);
		createNav('Edit',editCourses);
		createNav('Enrollments',enrollCourses);
		createNav('Due Dates',dueDates);
		createNav('Content Collection',contentCollection);
		createNav('Upload',uploadFile);
		createNav('DL GradeCenter',gradeCenterDL);


		// openCourses();
	}
});