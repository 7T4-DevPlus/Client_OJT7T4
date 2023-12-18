import React from 'react';

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';

import ButtonCommon from '../buttons/ButtonCommon';

const loadFile = (url, callback) => {
    PizZipUtils.getBinaryContent(url, callback);
  }

const ExportDoc = ({ data }) => {

    const exportFunction = () => {
        loadFile(
            '../../cvDoc/template.docx',
            function (error, content) {
                if (error) {
                    throw error;
                }
                var zip = new PizZip(content);
                var doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });
                doc.setData(data);
                try {
                    doc.render();
                } catch (error) {
                    function replaceErrors(key, value) {
                        if (value instanceof Error) {
                            return Object.getOwnPropertyNames(value).reduce(function (
                                error,
                                key
                            ) {
                                error[key] = value[key];
                                return error;
                            },
                                {});
                        }
                        return value;
                    }
                    console.log(JSON.stringify({ error: error }, replaceErrors));

                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors
                            .map(function (error) {
                                return error.properties.explanation;
                            })
                            .join('\n');
                        console.log('errorMessages', errorMessages);
                        // errorMessages is a humanly readable message looking like this :
                        // 'The tag beginning with "foobar" is unopened'
                    }
                    throw error;
                }
                var out = doc.getZip().generate({
                    type: 'blob',
                    mimeType:
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                }); //Output the document using Data-URI
                saveAs(out, `${data.name}-cv.docx`);
            }
        );
    }

    return (
        <ButtonCommon buttonType={"save"} handleOnClick={() => exportFunction()} />
    );
};

export default ExportDoc;
