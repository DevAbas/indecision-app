console.log('App is running');

const app = {
  title: 'Indecision app',
  subtitle: 'Put your life in the hands of a computer',
  options: []
}

const onFormSubmit = (e) => {
  e.preventDefault();

  const option = e.target.elements.option.value;
  app.options.push(option);
  e.target.elements.option.value = '';
  render();
}

const onRemoveAll = () => {
  app.options = [];
  render();
}
const makeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length); 
  const option = app.options[randomNum];
  alert(option);
}
const appRoot  = document.getElementById("root");
const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'There are no options'}</p>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Submit</button>
      </form>
      <button disabled={app.options.length === 0} onClick={makeDecision}>What should i do?</button>
      <button onClick={onRemoveAll}>Remove</button>
      <p>{app.options.length}</p>
      <ol>
        {
          app.options.map((option) => <li key={option}>{option}</li>)
        }
      </ol>
    </div>
  );
  ReactDOM.render(template, appRoot);
}

render();