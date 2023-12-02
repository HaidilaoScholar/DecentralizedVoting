
// 创建投票
window.createBallot = function(event, userId, userName, candidateAddress) {
    // 阻止表单的默认提交行为
    event.preventDefault();
    if (!userId || !userName || !candidateAddress) {
        alert('Please fill in all fields');
        return;
    }
    console.log(userName);
    // window.connectWallet();
    console.log(candidateAddress);

    // account.toString()

    window.location.reload();
    contract.SetCandidate(candidateAddress, userName)
    .then(() => {
        alert('Candidate set!');
        window.location.reload();
    })
    .catch(error => {
        console.error('An error occurred:', error);
        if (error.message.includes('_CandidateAlreadyExit')) {
            alert('The candidate address already exists. Please enter a new address.');
        } else {
            alert('An error occurred. Please try again.');
        }
    });

    window.location.href = 'voters.html';
};

// 获取投票结果
window.updateBallotResult = function() {
    window.connectWallet();
    if (!contract) {
      alert('Please connect wallet first!');
      return;
    }
    contract.getCandidate()
    .then(function(candidates) {
      console.log('Candidates:', JSON.stringify(candidates, null, 2));
  
      // 获取表格的tbody元素
      var tbody = document.querySelector('#ipi-table tbody');
  
      // 清空tbody
      tbody.innerHTML = '';
  
      // 使用智能合约返回的候选人数据生成新的行
      candidates.forEach(item => {
        var row = document.createElement('tr');
  
        var nameCell = document.createElement('td');
        nameCell.textContent = item[0];
        row.appendChild(nameCell);
  
        var addressCell = document.createElement('td');
        addressCell.textContent = item[1];
        row.appendChild(addressCell);
  
        var countCell = document.createElement('td');
        countCell.textContent = parseInt(item[2]._hex, 16); // 将16进制转换为10进制
        row.appendChild(countCell);
  
        tbody.appendChild(row);
      });
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
  }

window.vote = function(id,name,voterAddress,candidateAddress) {
    contract.methods.SetVote(id, name, voterAddress, candidateAddress)
    .send({ from: '0x9C0ce03196A2f6c74c34891e2768aa060704d18A' }) // 替换为实际的发送者地址
    .then(receipt => {
        console.log('Vote set successfully:', receipt);
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
    console.log('success'); 
};
