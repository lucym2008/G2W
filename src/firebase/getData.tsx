import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "./config";

export const Verfication = () => {
    const user = auth.currentUser; 
    if (!user) { //caso ele n esteja registrado
        console.log("Usuario não logado");
        return
    };  const uid = user.uid; //pega o id do usu  
}

//PAGINA HOME
export const getVagas = async (DadosJobs: any) => {
    const {setJobs, setFilteredJobs, setLoading} =  DadosJobs;
    try {
        const q = query(
        collection(db, "Vagas-trabalho"),
        limit(3) // Limita a 2 resultados
        );
        const querySnapshot = await getDocs(q);
        const jobsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        }));
        setJobs(jobsArray);
        setFilteredJobs(jobsArray); // Inicializa com todos os dados
    } catch (error) {
        console.error("Erro ao buscar as vagas:", error);
    } finally {
        setLoading(false);
    }
};

//GET EMPRESAS NA PAGINA
export const fetchEmpresas = async (valueData: any) => {
    const {setEmpresas, setFilteredEmpresas, setLoading} =  valueData;
    try {
        const q = query(
        collection(db, "Contas"),
        where("id", "==", "qA6ZTt44oSVeEjwkIn6tRU32SDA2"), // Condição
        limit(2)
        );
        const querySnapshot = await getDocs(q);      
        const UsersArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        }));
        setEmpresas(UsersArray);
        setFilteredEmpresas(UsersArray); // Inicializa com todos os dados
    } catch (error) {
        console.error("Erro ao buscar as vagas:", error);
    } finally {
        setLoading(false);
    }
};
    // const valueData = {setEmpresas, setFilteredEmpresas, setLoading}
    // fetchEmpresas(valueData);

    // const [empresas, setEmpresas] = useState([]);
    // const [filteredEmpresas, setFilteredEmpresas] = useState([]);
//   const renderItemEmpresas = ({ item }) => (
//     <View style={stylesVagas.item}>
//       <Text style={stylesVagas.title}>{item.displayName}</Text>
//       <Text style={stylesVagas.text}>Empresa: {item.empresa}</Text>
//       <Text style={stylesVagas.text}>Salário: R$ {item.salario}</Text>
//       <Text style={stylesVagas.text}>Contato: {item.fone}</Text>
//     </View>
//   );
    // <FlatList
    //   data={filteredEmpresas}
    //   keyExtractor={(item) => item.id}
    //   renderItem={renderItemEmpresas}
    //   scrollEnabled={false} // Previne conflitos de rolagem com o ScrollView
    // />


//função da pagina Home q leva os valores a pagina de procura de vagas VagasEmprego
export const fetchJobs = async (valueData: any, dataBox: any) => {
    const {setJobs, setFilteredJobs, setLoading} =  valueData;
    const {coleção, campo, valor} = dataBox;

    try {
        const q = query(
            collection(db, coleção),
            where(campo, "==", valor),
        );
        const querySnapshot = await getDocs(q);  
        const jobsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        }));
        setJobs(jobsArray);
        setFilteredJobs(jobsArray); // Inicializa com todos os dados
    } catch (error) {
        console.error("Erro ao buscar as vagas:", error);
    } finally {
        setLoading(false);
    }
};

//FUNÇÕES ACCOUNT
export const userVagas = async (userVagasConst: any) => {
    const {setUserVaga, setFilteredUserVagas, setLoading} = userVagasConst
    try {
        const q = query(
            collection(db, "Vagas-trabalho"),
            where("uid", "==", Verfication()), // Condição
        );
        const querySnapshot = await getDocs(q);      
        const UsersVagasArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setUserVaga(UsersVagasArray);
        setFilteredUserVagas(UsersVagasArray); // Inicializa com todos os dados
    } catch (error) {
        console.error("Erro vc não esta logado:", error);
    } finally {
        setLoading(false);
    }
};

export const userData = async (userDadosConst: any) => {
    const {setFilteredUsersData,setUsersData, setLoading} = userDadosConst
    try {
        const q = query(
        collection(db, "Contas"),
        where("id", "==", Verfication()), // Condição
        );
        const querySnapshot = await getDocs(q);      
        const UsersDataArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setUsersData(UsersDataArray);
        setFilteredUsersData(UsersDataArray); // Inicializa com todos os dados
    } catch (error) {
        console.error("Erro vc não esta logado:", error);
    } finally {
        setLoading(false);
    }
}