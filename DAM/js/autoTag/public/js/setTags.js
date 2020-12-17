    var tagify, imgFile;
    var threshold = 40;

    var showResults = function (tags) {
        var container = document.getElementById('outputTag'),
            preview = document.getElementById('preview'),
            tagEl = document.getElementById('tags-json'),
            tagInput = document.getElementById('tags'),
            tagList = getTagList(tags);

        tagEl.innerHTML = JSON.stringify(tags, null, 2);

        if (tagify) {
            tagify.removeAllTags();
            tagify.settings.whitelist = tagList.all;
        } else {
            tagify = new Tagify(
                tagInput, {
                    whitelist: tagList.all,
                    enforceWhitelist: true
                }
            );
        }
        tagify.addTags(tagList.auto);

        if (imgFile) {
            preview.src = URL.createObjectURL(imgFile.file);
        }
        container.classList.remove('hidden')
    };

    var getTagList = function (tags) {
        var list = {
            auto: [],
            all: []
        }
        for (var i = 0, ii = tags.length; i < ii; i++) {
            var tag = tags[i],
                t = tag.tag.en;

            if (list.auto.length < 3 || tag.confidence > threshold) {
                list.auto.push(t);
            }
            list.all.push(t);
        }
        return list;
    }
    FilePond.setOptions({
        server: {
            url: 'api/tag',
            process: {

                url: '',
                onload: function (response) {
                    var data = JSON.parse(response);
                    if (!data.tags) {
                        alert('Unable to fetch tags');
                        return
                    }
                    showResults(data.tags);
                    showMeta();
                }
            }
        },
        allowRevert: false,
        onaddfile: function (err, file) {
            if (err) return;
            imgFile = file;
        }
    });

    const inputFile = document.getElementsByClassName("filepond")[0];
    const outputDiv = document.getElementById("outputMeta");

    const showMeta = () => {
        if (imgFile.file && imgFile.file.name) {
            EXIF.getData(imgFile.file, function () {
                var allTags = EXIF.getAllTags(this);
                var exifData = EXIF.pretty(this);
                if (exifData) {
                    console.log(allTags);
                    outputDiv.innerText += exifData;
                } else {
                    alert(`No metadata found in image ${imgFile.file.name}.`);
                }
            });
        } else {
            console.log("not inside if");
        }

    }

    FilePond.parse(document.body);