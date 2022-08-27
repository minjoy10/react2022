

function Menu({recipes, title,  ...props}) {
debugger;
  console.log(aaa, bbb, props)
}


// {aaa, bbb,  ...props} = {};
const menus1 = new Menu({});

//
// {aaa, bbb,  ...props} = {aaa: '1111'};
const menus2 = new Menu({recipes: data , title:"맛있는 조리법"});