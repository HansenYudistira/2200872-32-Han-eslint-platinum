import React, {useState, useEffect} from 'react';
import { Skeleton } from 'antd';


// import component
import ModalProfile from '../ModalProfile';

// import api
import { CommunityApi } from '../../../api/communityApi';

// import styles
import styles from '../../../styles/LandingPage/community/table.module.css'

// import redux
import { useDispatch, useSelector } from "react-redux";
import { loadingSkeleton } from "../../../redux/action";

// use dummy data in case the server is error
const leaderList = [
    {
        id: -1,
        username: "Hansen",
        score: 270,
        rank: "gold",
        avatar: "https://source.unsplash.com/featured/100"
    },
    {
        id: -2,
        username: "Ignatius",
        score: 245,
        rank: "gold",
        avatar: "https://source.unsplash.com/featured/101"
    },
    {
        id: -3,
        username: "Difa",
        score: 150,
        rank: "silver",
        avatar: "https://source.unsplash.com/featured/102"

    },
    {
        id: -4,
        username: "Agnes",
        score: 145,
        rank: "silver",
        avatar: "https://source.unsplash.com/featured/103"
    },
    {
        id: -5,
        username: "Nour",
        score: 90,
        rank: "bronze",
        avatar: "https://source.unsplash.com/featured/104"
    }
  ];


  function Table() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedUserData, setClickedUserData] = useState(null);
    
    // get original state of redux
    const reduxState = useSelector(state => state.reducer)
    const dispatch = useDispatch()

    const [communityData, setCommunityData] = useState({ data: leaderList }); 

    const handleRowClick = (userData) => {
      setClickedUserData(userData);
      setIsModalOpen(true);
    };

    useEffect(() => {
      try {
        CommunityApi()
          .then((result) => {
            if (result !== undefined) {
              if (result.data.length > 0) {
                setCommunityData({ data: result.data });
              }
            }
          })
          .finally(() => dispatch(loadingSkeleton(false)));
      } catch (error) {
        console.log(error)
      }
    }, []);

    return (
      <div className={styles["table-container"]} style={{ backgroundColor: "#4E67EB", width: "800px" }}>
      <div className={styles["table-title"]}>
        <h1>SOBAT BERMAIN</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Country</th>
            <th>Score</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {reduxState.skeleton ? (

            // run skeleton while true
            <>
            {[...Array(10)].map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton active paragraph={false}/>
                </td>
                <td>
                  <Skeleton active paragraph={false}/>
                </td>
                <td>
                  <Skeleton active paragraph={false}/>
                </td>
                <td>
                  <Skeleton active paragraph={false}/>
                </td>
                <td>
                  <Skeleton active paragraph={false}/>
                </td>
              </tr>
            ))}
            </>

          ) : (
            
            // Render actual data
            communityData.data.map((data) => (
              <tr 
                key={data.id}
                onClick={() => handleRowClick(data)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <i className="far fa-gem mr-2 white-text" aria-hidden="true"></i>
                  <img src={data.avatar} alt="" height={30} width={30}></img>
                </td>
                <td>
                  <i className="far fa-gem mr-2 white-text" aria-hidden="true"></i>
                  {data.username}
                </td>
                <td>
                  <i className="fa fa-download mr-2 white-text" aria-hidden="true"></i>
                  {data.country}
                </td>
                <td>
                  <i className="far fa-gem mr-2 white-text" aria-hidden="true"></i>
                  {data.score}
                </td>
                <td>
                  <i className="fa fa-download mr-2 white-text" aria-hidden="true"></i>
                  {data.rank}
                </td>
              </tr>
            ))
          )}

        </tbody>
      </table>
      {isModalOpen && clickedUserData && (
        <ModalProfile onClose={() => setIsModalOpen(false)} userData={clickedUserData} />
      )}
    </div>    
    );
}

export default Table