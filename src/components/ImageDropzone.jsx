import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

const UploadAlbumDropzone = ({ params }) => {
  return (
    <>
      <div
        {...params.getRootProps()}
        id="dropzone-wrapper"
        className="text-center"
      >
        <input {...params.getInputProps()} />

        {params.isDragActive ? (
          params.isDragAccept ? (
            <p>Drop your file here.</p>
          ) : (
            <p>Sorry but that file format is not accepted.</p>
          )
        ) : (
          <p>Drop files or click here to uload image/images</p>
        )}

        {params.acceptedFiles && (
          <div className="accepted-files">
            <ul className="list-unstyled">
              {params.acceptedFiles.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {params.uploadAlbum.progress !== null && (
        <ProgressBar
          now={params.uploadAlbum.progress}
          animated
          variant="success"
        />
      )}
    </>
  )
}

export default UploadAlbumDropzone
