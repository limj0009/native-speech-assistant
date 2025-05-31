import * as FileSystem from 'expo-file-system';

export const transcribeSpeech = async (uri, apiKey) => {
  const formData = new FormData();

  formData.append("file", {
    uri,
    name: "audio.m4a",
    type: "audio/m4a",
  });
  formData.append("model", "whisper-1");
  formData.append("language", "en");

  try {
    const response = await FileSystem.uploadAsync(
      "https://api.openai.com/v1/audio/transcriptions",
      uri,
      {
        fieldName: 'file',
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          "Authorization": `Bearer ${apiKey}`,
        },
        parameters: {
          model: "whisper-1",
          language: "en",
        },
      }
    );

    const data = JSON.parse(response.body);
    return data.text;
  } catch (error) {
    console.error("Whisper API error:", error);
    return "";
  }
};
