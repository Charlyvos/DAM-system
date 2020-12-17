// const inputFile = document.getElementsByClassName("filepond")[0];
// const outputDiv = document.getElementById("output");

// inputFile.onchange = function (e) {
//     alert("etst")
//     outputDiv.innerText = ``;
//     $('#wrapperOutput').appendTo('.container');


//     for (let i = 0; i < e.target.files.length; i++) {
//         var file = e.target.files[i];
//         if (file && file.name) {
//             EXIF.getData(file, function () {
//                 var allTags = EXIF.getAllTags(this);
//                 var exifData = EXIF.pretty(this);
//                 if (exifData) {
//                     console.log(allTags);
//                     outputDiv.innerText += `Foto:${i+1}: \n ${exifData} \n`;
//                 } else {
//                     alert(`No metadata found in image ${file.name}.`);
//                 }
//             });
//         }
//     };
// }