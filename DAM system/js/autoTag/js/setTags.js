    var tagify, imgFile;
    var showResults = function (tags) {
        var container = document.getElementById('output'),
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

    var threshold = 40;
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
                }
            }
        },
        allowRevert: false,
        onaddfile: function (err, file) {
            if (err) return;
            imgFile = file;
        }
    });
    FilePond.parse(document.body);