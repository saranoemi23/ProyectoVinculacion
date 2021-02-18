const fallBackMimeType = 'data:application/octet-stream,'
export default function download({ content, mimeType = 'text/plain;encoding:utf-8', fileName }) {
  const a = document.createElement('a')

  if (URL && 'download' in a) {
    a.href = URL.createObjectURL(
      new Blob([content], {
        type: mimeType,
      })
    )
    a.setAttribute('download', fileName)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } else {
    location.href = fallBackMimeType + encodeURIComponent(content)
  }
}
