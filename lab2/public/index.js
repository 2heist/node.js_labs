import teamMembers from './data.js';

const teamList = document.getElementById('team-list');

teamMembers.forEach((member, index) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = `/team/${index}`;
  a.textContent = member.name;

  li.appendChild(a);
  teamList.appendChild(li);
});