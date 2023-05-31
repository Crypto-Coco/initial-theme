
// ========== NETWORK MODAL ========== //
function openNetworkModal(action, network, chain_id) {
  const changeNetworkModal = document.getElementById('changeNetworkModal');
  changeNetworkModal.style.display = 'block';

  const description = changeNetworkModal.getElementsByClassName('description')[0];
  description.textContent = description.textContent.replace('network_name', network).replace('action', action);

  window.addEventListener('click', (event) => {
    if (event.target === changeNetworkModal) {
      changeNetworkModal.style.display = 'none';
      localStorage.removeItem('previousAction');
      window.removeEventListener('click', () => {});
    }
  });

  const changeNetworkButton = document.getElementById('changeNetworkBtn');
  changeNetworkButton.addEventListener('click', () => {
    changeNetwork(action, chain_id);
  });
}

function closeNetworkModal() {
  const changeNetworkModal = document.getElementById('changeNetworkModal');
  changeNetworkModal.style.display = 'none';
  localStorage.removeItem('previousAction');
}

function changeNetwork(action, chain_id) {
  const changeNetworkButton = document.getElementById('changeNetworkBtn');
  const changeNetworkModal = document.getElementById('changeNetworkModal');
  changeNetworkButton.disabled = true;
  changeNetworkButton.innerHTML = 'Switching...';
  localStorage.setItem('previousAction', action);
  changeChain(chain_id)
    .then(() => {
      changeNetworkModal.style.display = 'none';
      changeNetworkButton.disabled = false;
      changeNetworkButton.innerHTML = 'Switch';
    })
    .catch((error) => {
      console.log(error);
      changeNetworkButton.disabled = false;
      changeNetworkButton.innerHTML = 'Switch';
      localStorage.removeItem('previousAction');
    });
}

// ========== WALLET MODAL ========== //
function openWalletModal(action) {
  const connectWalletModal = document.getElementById('connect_modal');
  connectWalletModal.style.display = 'block';

  window.addEventListener('click', (event) => {
    if (event.target === connectWalletModal) {
      connectWalletModal.style.display = 'none';
      window.removeEventListener('click', () => {});
    }
  });

  const connectWalletButton = document.getElementById('connect_btn');
  connectWalletButton.addEventListener('click', () => {
    connect(action);
  });
}

function closeWalletModal() {
  const connectWalletModal = document.getElementById('connect_modal');
  connectWalletModal.style.display = 'none';
}

function connect(action) {
  const connectButton = document.getElementById('connect_btn');
  connectButton.disabled = true;
  connectButton.innerHTML = 'Connecting...';
  if (action) {
    localStorage.setItem('previousAction', action);
  }
  connectWallet()
    .then(() => {
      connectModal.style.display = 'none';
      connectButton.disabled = false;
      connectButton.innerHTML = 'Metamask';
    })
    .catch((error) => {
      console.log(error);
      connectButton.disabled = false;
      connectButton.innerHTML = 'Metamask';
    });
}