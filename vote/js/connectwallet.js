
window.contract = null;

window.connectWallet = function() {
    let ABI;
    // let ContractAddress = "0x76dEf043B734ff0b10ADF5d41E6B9b6ab0242567";
    
    let ContractAddress = "0x206A9Daefb578F44F5E57E4cbcd4d77986B7f072";

    fetch('./baseline_abi.json')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched baseline.json');
            ABI = data;
            console.log(ABI);
            console.log('Adding window.onload event handler...');
            window.addEventListener('load', function() {
                // 检查是否已安装MetaMask
                if (typeof window.ethereum !== 'undefined') {
                    console.log('MetaMask is installed!');
                } else {
                    alert('Please install MetaMask!');
                    return;
                }
                // 创建web3和ethers的实例
                const web3 = new Web3(window.ethereum);
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                // 获取按钮元素
                const connectButton = document.getElementById('connect-button');
                const disconnectButton = document.getElementById('disconnect-button');

                // 为按钮添加点击事件监听器
                connectButton.addEventListener('click', function() {
                    // 请求用户连接钱包
                    window.ethereum.request({ method: 'eth_requestAccounts' })
                        .then(function(accounts) {
                            // 连接成功后，accounts数组中会包含用户的地址
                            console.log('Connected accounts:', accounts);
                            connectButton.innerText = accounts[0];
                            // disconnectButton.disabled = false;

                            const signer = provider.getSigner();
                            window.contract = new ethers.Contract(ContractAddress, ABI, signer);
                            console.log(window.contract);
                        })
                        .catch(function(error) {
                            // 如果用户拒绝连接，或者发生其他错误，你可以在这里处理
                            console.error('Error:', error);
                            alert('Failed to connect wallet: ' + error.message);
                        });
                });
            });
        });
}

window.connectWallet();