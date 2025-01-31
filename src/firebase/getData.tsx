import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "./config";

export const Verfication = () => {
    const user = auth.currentUser; 
    if (!user) { //caso ele n esteja registrado
        console.log("Usuario não logado");
        return
    };  const uid = user.uid; //pega o id do usu  
}

                       { /*FUNÇÕES HOME*/ } 
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
                            { /*FIM FUNÇÕES HOME*/ } 




                            { /*FUNÇÕES ViSUALIZAÇÕES*/ } 
export const fetchEmpresas = async (valueData: any) => {
    const {setEmpresas, setFilteredEmpresas, setLoading} =  valueData;
    try {
        const q = query(
        collection(db, "Contas"),
        where("tipoConta", "==", "Empresa"), // Condição
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

export const getFreelancerVagas = async (DadosFreelancer: any) => {
    const {setFreelancer, setFilteredFreelancer, setLoading} =  DadosFreelancer;
    try {
        const q = query(
        collection(db, "Vagas-trabalho"),
        where("tipo", "==", "Freelancer"),
        limit(3) // Limita a 2 resultados
        );
        const querySnapshot = await getDocs(q);
        const jobsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        }));
        setFreelancer(jobsArray);
        setFilteredFreelancer(jobsArray); // Inicializa com todos os dados
    } catch (error) {
        console.error("Erro ao buscar as vagas freelancer:", error);
    } finally {
        setLoading(false);
    }
};
                            { /*FIM FUNÇÕES ViSUALIZAÇÕES*/ }


                            { /*FUNÇÕES VAGAS-EMPREGO*/ }
export const fetchJobs = async (valueData: any, dataBox: any, dataBox2: any) => {
    const { setJobs, setFilteredJobs, setLoading } = valueData;
    const { coleção, campo, valor } = dataBox;

    // Coloca o loading como true antes de buscar os dados
    setLoading(true);
    try {
        let q; 
        // Verifica se 'campo' e 'valor' estão vazios
        if (!campo || !valor) {
            // Se os campos estão vazios, faz a query para buscar todas as vagas na coleção "Vagas-trabalho"
            q = query(collection(db, "Vagas-trabalho"));
        } else {
            // Caso contrário, faz a query com filtro na coleção especificada
            q = query(
                collection(db, coleção),
                where(campo, "==", valor)
            );
        }
        // Busca os documentos da query
        const querySnapshot = await getDocs(q);
        // Mapeia os documentos retornados para um array
        const jobsArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        // Atualiza o estado com os resultados
        setJobs(jobsArray);
        setFilteredJobs(jobsArray);  // Inicializa com os dados filtrados ou completos
    } catch (error) {
        // Caso haja algum erro
        console.error("Erro ao buscar as vagas:", error);
    } finally {
        // Certifica-se de que o loading seja setado como false após a operação
        setLoading(false);
    }
};
                              { /*FUNÇÕES VAGAS-EMPREGO*/ }


export const fetchJobs22 = async (valueData: any, dataBox: any, dataBox2: any) => {
    const {setJobs, setFilteredJobs, setLoading} =  valueData;
    const {coleção, campo, valor} = dataBox;
    const { coleçãoUnica } = dataBox2
    if (!campo || !valor) {
        try {
        const q = query(
            collection(db, "Vagas-trabalho"),
        );
        const querySnapshot = await getDocs(q);  
        const jobsArray = querySnapshot.docs.map(doc => ({
        id: doc.id, ...doc.data(),
        }));
        setJobs(jobsArray);
        setFilteredJobs(jobsArray); // Inicializa com todos os dados
    } catch (error) {
        console.error("Erro ao buscar as vagas:", error);
    } finally {
        setLoading(false);
    }
    } else {
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
}
{ /*FUNÇÕES ACCOUNT*/ }




                                { /*FUNÇÕES ACCOUNT*/ }
export const userVagas = async (userVagasConst: any) => {
    const {setUserVaga, setFilteredUserVagas, setLoading} = userVagasConst
    try {
        const q = query(
            collection(db, "Vagas-trabalho"),
            where("uid", "==", "gnxZyjqSPmXCmzqFlv0001JL1T92"), // Condição
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
        where("id", "==", "gnxZyjqSPmXCmzqFlv0001JL1T92"), // Condição
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
                           { /*FIM FUNÇÕES ACCOUNT*/ }

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
