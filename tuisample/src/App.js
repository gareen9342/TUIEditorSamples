import React, { useRef, useState, useEffect } from "react"
import "@toast-ui/editor/dist/toastui-editor.css"
import { Editor } from "@toast-ui/react-editor"

function App() {
    const editorRef = useRef()
    const [text, setText] = useState("")

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.getInstance().removeHook("addImageBlobHook");
            editorRef.current
                .getInstance()
                .addHook("addImageBlobHook", (blob, callback) => {
                    (async () => {
                      /**
                       * 이미지 받아오는 함수를 실행합니다.
                       * blob 은 해당 이미지 파일이에요. 이 파일을 서버로 보내면 돼요.
                       * 받아온 이미지 주소를 callback 에 인수로 넣고, 두 번째 인수로는 alt 텍스트를 넣을 수 있어요. 아래의 모드는 예시입니다.
                       */
                      // let formData = new FormData();
                        // formData.append("file", blob);
                        //
                        // axios.defaults.withCredentials = true;
                        // const { data: url } = await axios.post(
                        //     `${backUrl}image.do`,
                        //     formData,
                        //     {
                        //         header: { "content-type": "multipart/formdata" },
                        //     }
                        // );
                        callback(url, "alt text");
                    })();

                    return false;
                });
        }

        return () => {};
    }, [editorRef]);
    return (
        <div>
            <Editor
                initialValue="스터디에 대한 정보를 간략히 작성해주세요 '-'"
                previewStyle="tab"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                onChange={() => {
                  console.log("text changed") // 텍스트 필드의 onchange 함수를 여기서 받을 수 있음
                }}
                ref={editorRef}
            />
        </div>
    );
}

export default App;