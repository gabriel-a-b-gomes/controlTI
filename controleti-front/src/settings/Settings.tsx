import { NavLink } from 'react-router-dom';

import './styles/SettingsStyles.css';

function Settings() {
    return (
        <div className="container-settings">
            <div className='nav-settings'>
                <nav>
                    <div className='tabs-settings'>
                        <NavLink to='users'><button>Usuários</button></NavLink>
                        <NavLink to='profiles'><button>Perfis de Uso</button></NavLink>
                        <NavLink to='departments'><button>Departamentos</button></NavLink>
                        <NavLink to='functionalities'><button>Funcionalidades</button></NavLink>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Settings;