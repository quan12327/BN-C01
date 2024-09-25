const fs = require("fs");
const path = require("path");
const { title } = require("process");
let rl = require("readline-sync").question;

const filePath = path.join("src", "data.json");

const posts = JSON.parse(fs.readFileSync(filePath, "utf-8")).posts;

const reWriteDataFile = (posts) => {
  fs.writeFileSync(filePath, JSON.stringify({ posts }));
};

const showChoices = (choiceArray) => {
  const len = choiceArray.length;
  for (let i = 0; i < len; i++) {
    console.log(i + 1, choiceArray[i]);
  }
};

const returnMenu = () => {
  console.log("-------------------");
  const choiceArray = ["Thoat ung dung", "Quay ve menu"];
  showChoices(choiceArray);
  const choice = Number(rl("Nhap vao lua chon: "));
  while (isNaN(choice) || choice < 1 || choice > 2) {
    choice = Number(rl("Nhap vao dung kieu du lieu: "));
  }
  if(choice===1) return 0;
  else main();
};

const addNewBlog = (posts) => {
  console.clear();
  const newData = posts;
  const date = new Date();
  const newtitle = rl("tieu de: ");
  const newContent = rl("noi dung: ");
  const newTopic = rl("the loai: ");
  const newAuthor = rl("tac gia: ");
  const newDate =
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  const newBlog = {
    id: posts.length + 1,
    title: newtitle,
    content: newContent,
    topic: newTopic,
    author: newAuthor,
    date: newDate,
  };

  newData.push(newBlog);
  posts = newData;
  fs.writeFileSync(filePath, JSON.stringify({ posts }));
};

const alterBlog = (posts) => {
  console.clear();
  const newData = posts;
  let noneBlogs = 0;
  let id = Number(rl("Nhap vao id bai viet can sua: "));
  while (isNaN(id)) {
    id = Number(rl("Nhap vao dung kieu du lieu: "));
  }
  for (blog of newData) {
    if (blog.id === id) {
      const index = blog.id - 1;
      const date = new Date();
      const alterBlog = {
        id: id,
        title: rl("Nhap tieu de: "),
        content: rl("Nhap noi dung: "),
        author: rl("Nhap tac gia: "),
        topic: rl("Nhap chu de: "),
        date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
      };
      noneBlogs = 1;
      newData.splice(index, 1, alterBlog);
      posts = newData;
      reWriteDataFile(posts);
    }
  }
  if (noneBlogs == 0) console.log("khong tim thay blog");
};

const deleteBlog = (posts) => {
  console.clear();
  const newData = posts;
  let noneBlogs = 0;
  let id = Number(rl("Nhap vao id bai viet can sua: "));
  while (isNaN(id)) {
    id = Number(rl("Nhap vao dung kieu du lieu: "));
  }
  for (blog of newData) {
    if (blog.id === id) {
      const index = blog.id - 1;
      noneBlogs = 1;
      newData.splice(index, 1);
      posts = newData;
      reWriteDataFile(posts);
    }
  }
  if (noneBlogs == 0) console.log("khong tim thay blog");
};

const choiceTopic = (posts) => {
  console.clear();
  const topicArray = [
    "Lập Trình",
    "Front-end Development",
    "Data Science",
    "Mobile App Development",
    "UI/UX Design",
    "Game Development",
    "Software Engineering",
    "Artificial Intelligence",
    "Cybersecurity",
  ];
  const result = [];
  let noneBlogs = 0;
  showChoices(topicArray);
  let topic = Number(rl("Nhap so thu tu topic can tim: "));
  while (isNaN(topic) || topic < 1 || topic > 8) {
    topic = Number(rl("Nhap vao dung so: "));
  }
  for (blog of posts) {
    if (blog.topic === topicArray[topic]) {
      result.push(blog);
      noneBlogs = 1;
    }
  }
  if (noneBlogs == 0) console.log("khong tim thay blog");
  else console.table(result);
};

const dateSort = (posts) => {
  console.clear();
  const newposts = posts;
  console.log("1. Sap xep theo ngay giam dan");
  console.log("2. Sap xep theo ngay tang dan");
  const choice = Number(rl("Nhap vao lua chon:"));
  while (isNaN(choice) || choice < 1 || choice > 2) {
    choice = Number(rl("Nhap vao dung so: "));
  }
  if (choice === 1) {
    for (let i = 1; i < newposts.length; i++) {
      for (let j = 0; j < newposts.length; j++) {
        const date = new Date(newposts[i].date);
        const date2 = new Date(newposts[j].date);
        const tmp1 = { ...newposts[i] };
        const tmp2 = { ...newposts[j] };
        if (date > date2) {
          newposts.splice(i, 1, tmp2);
          newposts.splice(j, 1, tmp1);
        }
      }
    }
  } else {
    for (let i = 1; i < newposts.length; i++) {
      for (let j = 0; j < newposts.length; j++) {
        const date = new Date(newposts[i].date);
        const date2 = new Date(newposts[j].date);
        const tmp1 = { ...newposts[i] };
        const tmp2 = { ...newposts[j] };
        if (date < date2) {
          newposts.splice(i, 1, tmp2);
          newposts.splice(j, 1, tmp1);
        }
      }
    }
  }
  posts = newposts;
  reWriteDataFile(posts);
};

const main = () => {
  console.clear();
  const choiceArray = [
    "Hien thi data",
    "Them moi blog",
    "Sua blog",
    "Xoa bai viet",
    "Loc chu de",
    "Sap xep theo ngay",
  ];
  console.log(0, "Thoat ung dung");
  showChoices(choiceArray);
  const choice = Number(rl("Nhap lua chon theo stt: "));

  while (isNaN(choice) || choice < 0 || choice > 6) {
    choice = Number(rl("Nhap vao dung so: "));
  }
  switch (choice) {
    case 1:
      console.table(posts);
      returnMenu();
      break;
    case 2:
      addNewBlog(posts);
      returnMenu();
      break;
    case 3:
      alterBlog(posts);
      returnMenu();
      break;
    case 4:
      deleteBlog(posts);
      returnMenu();
      break;
    case 5:
      choiceTopic(posts);
      returnMenu();
      break;
    case 6:
      dateSort(posts);
      returnMenu();
      break;
  }
};
main();

