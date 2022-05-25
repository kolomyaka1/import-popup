import { useState } from 'react';
import './App.css';
import './buttons.css';
import { parse } from 'papaparse';

function App() {
  const [highlighted, setHighlighted] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const [fileName, setFileName] = useState('');
  return (
    <div className="overlay" data-modal="import">
      <div className="module import" style={{ width: '583px' }}>
        <header>
          <h3>Импорт из excel</h3>
          <span className="icon close">
            <svg
              className="css-fill dark-text"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.14645 5.14645C5.34171 4.95118 5.65829 4.95118 5.85355 5.14645L12 11.2929L18.1464 5.14645C18.3417 4.95118 18.6583 4.95118 18.8536 5.14645C19.0488 5.34171 19.0488 5.65829 18.8536 5.85355L12.7071 12L18.8536 18.1464C19.0488 18.3417 19.0488 18.6583 18.8536 18.8536C18.6583 19.0488 18.3417 19.0488 18.1464 18.8536L12 12.7071L5.85355 18.8536C5.65829 19.0488 5.34171 19.0488 5.14645 18.8536C4.95118 18.6583 4.95118 18.3417 5.14645 18.1464L11.2929 12L5.14645 5.85355C4.95118 5.65829 4.95118 5.34171 5.14645 5.14645Z"
              />
            </svg>
          </span>
        </header>
        <section
          className={`modal__body import flex block center xl-gap ${
            highlighted ? 'highlited' : ''
          } ${errorState ? 'error' : ''}`}
          onDragEnter={(e) => {
            setHighlighted(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setHighlighted(true);
          }}
          onDragLeave={(e) => {
            setHighlighted(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setHighlighted(false);
            let files = Array.from(e.dataTransfer.files);
            setFileName(files[0].name);
            // Проверка на тип файла
            let correctFiles = files.filter((file) => file.type === 'text/csv');
            if (correctFiles.length === 0) {
              console.log('Error import file', fileName);
              setErrorState(true);
              setSuccessState(false);
            } else if (correctFiles !== 0) {
              correctFiles.forEach(async (file) => {
                let text = await file.text();
                let result = parse(text);
                console.log('File result: ', result.data);
              });
              setErrorState(false);
              setSuccessState(true);
            }
          }}>
          {successState ? (
            <>
              <span className="success">Загрузка {fileName} успешно завершена!</span>
              <button
                className="secondary"
                onClick={() => {
                  setSuccessState(false);
                  setFileName('');
                }}>
                Загрузить другой файл
              </button>
            </>
          ) : (
            <>
              {errorState ? (
                <>
                  <span>Ошибка загрузки {fileName}</span>
                  <p>
                    Проверьте, соответствует ли загружаемая таблица формату формы и поробуйте
                    загрузить файл еще раз.
                  </p>
                </>
              ) : (
                <>
                  <div className="modal__body-header">Перетащите файл сюда или</div>
                  <label>
                    <span>Выберите файл на компьютере</span>
                    <input type="file" style={{ display: 'none' }} />
                  </label>
                </>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
