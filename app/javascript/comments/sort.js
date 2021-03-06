function sort (){
  console.log("neko")
  if(document.URL.match(/themes\/\d/)){
    const comBox = document.getElementById("com-box")
    const btnNew = document.getElementById("new")
    const btnOld = document.getElementById("old")
    const btnDcNew = document.getElementById("dc-new")
    const btnDcOld = document.getElementById("dc-old")

    btnNew.addEventListener('click', function(){
      let changeComments = newCom()
      changeComments.sort(orderAsc)
      changeComments.forEach(function(com){
        comBox.insertAdjacentElement('afterbegin',com.value)
      })
    })

    btnOld.addEventListener('click', function(){
      let changeComments = newCom()
      changeComments.sort(orderDesc)
      changeComments.forEach(function(com){
        comBox.insertAdjacentElement('afterbegin',com.value)
      })
    })

    btnDcNew.addEventListener('click',function(){
      let changeComments = newCom()
      changeComments.sort(orderDesc)
      discontinuousSort(changeComments).reverse().forEach(function(com){
        comBox.insertAdjacentElement('afterbegin',com.value)
      })
    }) 

    btnDcOld.addEventListener('click',function(){
      let changeComments = newCom()
      changeComments.sort(orderAsc)
      discontinuousSort(changeComments).reverse().forEach(function(com){
        comBox.insertAdjacentElement('afterbegin',com.value)
      })
    })

    function newCom(){
      let comments = document.querySelectorAll(".comment")
      let arrCom = []
      let i = 0
      comments.forEach(function(comment){
        arrCom[i] = {}
        arrCom[i].id = comment.getAttribute("data-id")
        arrCom[i].subTheme = comment.getAttribute("data-sub-theme")
        arrCom[i].value = comment
        i += 1
      })
      return arrCom
    }

    function orderAsc(a,b){
      if(Number(a.id) < Number(b.id)) return -1;
      if(Number(a.id) > Number(b.id)) return 1;
      return 0;
    }
    
    function orderDesc(a,b){
      if(Number(a.id) < Number(b.id)) return 1;
      if(Number(a.id) > Number(b.id)) return -1;
      return 0;
    }

    function discontinuousSort(arr){
      for(let x=0; x < arr.length-2; x++ ){
        let y = x + 1
        let z = 1
        let sliceArr = arr.slice(y)
        let result = sliceArr.every(c => c.subTheme == sliceArr[0].subTheme)
        if (result){
          return arr
        }
        while(arr[x].subTheme == arr[y].subTheme){
          let t = arr[y]
          arr[y] = arr[y+z]
          arr[y+z] = t
          z += 1
        }
      }
      return arr
    }

  }
}

window.addEventListener("turbolinks:load", sort) 
