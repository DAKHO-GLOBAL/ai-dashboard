// import React, { useState, useEffect } from 'react';
// import { Card, CardContent } from '../components/ui/card';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';
// import Papa from 'papaparse';

// const Dashboard = () => {
//   const [rankingsData, setRankingsData] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadRankingsData = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         const response = await fetch('../data/GIRAI_2024_Edition_Data_Rankings_and_Scores.csv');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const text = await response.text();
        
//         // Traitement des données avec PapaParse
//         Papa.parse(text, {
//           header: false,
//           skipEmptyLines: 'greedy',
//           encoding: "UTF-8",
//           complete: (results) => {
//             if (results.errors.length > 0) {
//               console.log('Erreurs de parsing:', results.errors);
//             }

//             // Extraction des données à partir de la ligne 3 (index 2)
//             const formattedData = results.data.slice(2)
//               .filter(row => row[0] && !isNaN(parseInt(row[0]))) // Vérifie que le rang est un nombre
//               .map(row => {
//                 const rank = parseInt(row[0]);
//                 const country = row[2];
//                 const indexScore = parseFloat(row[6]);
                
//                 return {
//                   country,
//                   rank,
//                   region: row[3] || 'Non spécifié',
//                   indexScore: indexScore || 0,
//                   scores: {
//                     // Scores sous PILLAR SCORES
//                     nonState: parseFloat(row[9]) || 0,
//                     // Scores sous DIMENSION SCORES
//                     humanRights: parseFloat(row[10]) || 0,
//                     governance: parseFloat(row[11]) || 0,
//                     capacities: parseFloat(row[12]) || 0
//                   }
//                 };
//               })
//               .filter(item => 
//                 item.indexScore > 0 && 
//                 Object.values(item.scores).some(score => score > 0)
//               )
//               .sort((a, b) => a.rank - b.rank)
//               .slice(0, 20);

//             console.log('Données chargées:', formattedData[0]);
//             setRankingsData(formattedData);
//             setIsLoading(false);
//           },
//           error: (error) => {
//             console.error('Erreur de parsing:', error);
//             setError(error.message);
//             setIsLoading(false);
//           }
//         });
//       } catch (error) {
//         console.error('Erreur de chargement:', error);
//         setError(error.message);
//         setIsLoading(false);
//       }
//     };

//     loadRankingsData();
//   }, []);

//   if (error) {
//     return (
//       <div className="p-4 text-center">
//         <div className="text-red-600 mb-4">Erreur: {error}</div>
//         <div className="text-sm text-gray-600">
//           Vérifiez que le fichier CSV est bien placé dans le dossier public/data
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="p-4 text-center">
//         <div className="text-gray-600">Chargement des données...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6">Global Index on Responsible AI</h1>
//       <div className="text-sm text-gray-600 mb-4">
//         Pays analysés : {rankingsData.length}
//       </div>

//       <Card>
//         <CardContent className="pt-6">
//           <div className="h-96">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart 
//                 data={rankingsData}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis 
//                   dataKey="country" 
//                   interval={0}
//                   angle={-45}
//                   textAnchor="end"
//                   height={100}
//                   tick={{ fontSize: 12 }}
//                 />
//                 <YAxis 
//                   domain={[0, 100]}
//                   tick={{ fontSize: 12 }}
//                 />
//                 <Tooltip content={({ active, payload, label }) => {
//                   if (active && payload && payload.length) {
//                     const country = rankingsData.find(d => d.country === label);
//                     return (
//                       <div className="bg-white p-4 border rounded shadow">
//                         <p className="font-bold">{label}</p>
//                         <p className="text-sm text-gray-600">Rang : {country?.rank}</p>
//                         <p className="text-sm text-gray-600 mb-2">Score global : {country?.indexScore.toFixed(1)}</p>
//                         {payload.map((entry) => (
//                           <p key={entry.name} style={{ color: entry.color }}>
//                             {entry.name}: {parseFloat(entry.value).toFixed(1)}
//                           </p>
//                         ))}
//                       </div>
//                     );
//                   }
//                   return null;
//                 }} />
//                 <Legend 
//                   wrapperStyle={{ paddingTop: '20px' }}
//                   height={36}
//                 />
//                 <Bar 
//                   dataKey="scores.nonState" 
//                   name="Acteurs non étatiques" 
//                   fill="#ffc658" 
//                 />
//                 <Bar 
//                   dataKey="scores.humanRights" 
//                   name="Droits humains & IA" 
//                   fill="#ff7300" 
//                 />
//                 <Bar 
//                   dataKey="scores.governance" 
//                   name="Gouvernance IA" 
//                   fill="#8884d8" 
//                 />
//                 <Bar 
//                   dataKey="scores.capacities" 
//                   name="Capacités IA" 
//                   fill="#82ca9d" 
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import Papa from 'papaparse';

// Tableau des leaders avec mise en forme améliorée
const LeadersTable = ({ data }) => {
  if (!data || data.length === 0) return null;

  const topCountries = data.slice(0, 10);

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h3 className="font-bold text-xl mb-4">Top 10 des Pays</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Rang</th>
                <th className="px-4 py-2 text-left">Pays</th>
                <th className="px-4 py-2 text-left">Score Global</th>
                <th className="px-4 py-2 text-left">Acteurs non étatiques</th>
                <th className="px-4 py-2 text-left">Droits humains</th>
                <th className="px-4 py-2 text-left">Gouvernance</th>
                <th className="px-4 py-2 text-left">Capacités</th>
              </tr>
            </thead>
            <tbody>
              {topCountries.map((country, index) => (
                <tr 
                  key={country.rank}
                  className={`
                    ${index === 0 ? 'bg-yellow-50 font-semibold' : index % 2 === 0 ? 'bg-gray-50' : ''}
                    hover:bg-gray-100 transition-colors
                  `}
                >
                  <td className="px-4 py-2">{country.rank}</td>
                  <td className="px-4 py-2">{country.country}</td>
                  <td className="px-4 py-2">{country.indexScore.toFixed(1)}</td>
                  <td className="px-4 py-2">{country.scores.nonState.toFixed(1)}</td>
                  <td className="px-4 py-2">{country.scores.humanRights.toFixed(1)}</td>
                  <td className="px-4 py-2">{country.scores.governance.toFixed(1)}</td>
                  <td className="px-4 py-2">{country.scores.capacities.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const LeadershipBoard = ({ leaders }) => {
  if (!leaders || !leaders.overall) return null;
  
  const categoryMap = {
    "Acteurs non étatiques": "nonState",
    "Droits humains & IA": "humanRights",
    "Gouvernance IA": "governance",
    "Capacités IA": "capacities"
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2">Leader Global</h3>
          <div className="text-sm space-y-1">
            <p className="font-medium">{leaders.overall.country || 'N/A'}</p>
            <p>Score Global: {(leaders.overall.indexScore || 0).toFixed(1)}</p>
            <p>Rang: #{leaders.overall.rank || 'N/A'}</p>
          </div>
        </CardContent>
      </Card>
      {Object.entries(categoryMap).map(([categoryName, categoryKey]) => {
        const leader = leaders[categoryKey];
        if (!leader) return null;
        return (
          <Card key={categoryKey}>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">Leader en {categoryName}</h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{leader.country || 'N/A'}</p>
                <p>Score: {(leader.scores?.[categoryKey] || 0).toFixed(1)}</p>
                <p>Rang Global: #{leader.rank || 'N/A'}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const Dashboard = () => {
  const [rankingsData, setRankingsData] = useState([]);
  const [leaderAnalysis, setLeaderAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('Tous');
  const [viewType, setViewType] = useState('bar');

  useEffect(() => {
    const loadRankingsData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/data/GIRAI_2024_Edition_Data_Rankings_and_Scores.csv');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        
        Papa.parse(text, {
          header: false,
          skipEmptyLines: 'greedy',
          encoding: "UTF-8",
          complete: (results) => {
            const formattedData = results.data.slice(2)
              .filter(row => row[0] && !isNaN(parseInt(row[0])))
              .map(row => ({
                country: row[2],
                rank: parseInt(row[0]),
                region: row[3] || 'Non spécifié',
                indexScore: parseFloat(row[6]) || 0,
                scores: {
                  nonState: parseFloat(row[9]) || 0,
                  humanRights: parseFloat(row[10]) || 0,
                  governance: parseFloat(row[11]) || 0,
                  capacities: parseFloat(row[12]) || 0
                }
              }))
              .filter(item => 
                item.indexScore > 0 && 
                Object.values(item.scores).some(score => score > 0)
              )
              .sort((a, b) => a.rank - b.rank);

            setRankingsData(formattedData);

            const leaders = formattedData.length > 0 ? {
              overall: formattedData[0],
              nonState: formattedData.reduce((a, b) => (a.scores?.nonState || 0) > (b.scores?.nonState || 0) ? a : b),
              humanRights: formattedData.reduce((a, b) => (a.scores?.humanRights || 0) > (b.scores?.humanRights || 0) ? a : b),
              governance: formattedData.reduce((a, b) => (a.scores?.governance || 0) > (b.scores?.governance || 0) ? a : b),
              capacities: formattedData.reduce((a, b) => (a.scores?.capacities || 0) > (b.scores?.capacities || 0) ? a : b),
            } : null;

            setLeaderAnalysis(leaders);
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error('Erreur:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    loadRankingsData();
  }, []);

  const filteredData = rankingsData
    .filter(item => selectedRegion === 'Tous' || item.region === selectedRegion);

  const prepareRadarData = (data) => {
    return data.map(item => ({
      country: item.country,
      "Acteurs non étatiques": item.scores.nonState,
      "Droits humains & IA": item.scores.humanRights,
      "Gouvernance IA": item.scores.governance,
      "Capacités IA": item.scores.capacities
    }));
  };

  const getBarFill = (country) => {
    return country === leaderAnalysis?.overall.country ? '#FFD700' : '#82ca9d';
  };

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-600 mb-4">Erreur: {error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="text-gray-600">Chargement des données...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Global Index on Responsible AI</h1>
      
      <LeadershipBoard leaders={leaderAnalysis} />
      
      <LeadersTable data={rankingsData} />
      
      <div className="mb-6 flex items-center gap-4">
        <select 
          className="border rounded p-2"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          {['Tous', ...new Set(rankingsData.map(item => item.region))].map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <select 
          className="border rounded p-2"
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
        >
          <option value="bar">Graphique en barres</option>
          <option value="radar">Graphique radar</option>
        </select>

        <div className="text-sm text-gray-600">
          Pays analysés : {filteredData.length}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="h-[32rem]"> {/* Hauteur augmentée pour une meilleure visualisation */}
            <ResponsiveContainer width="100%" height="100%">
              {viewType === 'bar' ? (
                <BarChart 
                  data={filteredData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="country" 
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const country = filteredData.find(d => d.country === label);
                      return (
                        <div className="bg-white p-4 border rounded shadow">
                          <p className="font-bold">{label}</p>
                          <p className="text-sm text-gray-600">Rang : {country?.rank}</p>
                          <p className="text-sm text-gray-600 mb-2">Score global : {country?.indexScore.toFixed(1)}</p>
                          {payload.map((entry) => (
                            <p key={entry.name} style={{ color: entry.color }}>
                              {entry.name}: {parseFloat(entry.value).toFixed(1)}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} height={36} />
                  <Bar 
                    dataKey="scores.nonState" 
                    name="Acteurs non étatiques" 
                    fill="#8884d8"
                  />
                  <Bar 
                    dataKey="scores.humanRights" 
                    name="Droits humains & IA" 
                    fill="#ff7300"
                  />
                  <Bar 
                    dataKey="scores.governance" 
                    name="Gouvernance IA" 
                    fill="#82ca9d"
                  />
                  <Bar 
                    dataKey="scores.capacities" 
                    name="Capacités IA" 
                    fill="#ffc658"
                  />
                </BarChart>
              ) : (
                <RadarChart outerRadius={180} width={800} height={500} data={prepareRadarData(filteredData)}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="country" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Acteurs non étatiques"
                    dataKey="Acteurs non étatiques"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Droits humains & IA"
                    dataKey="Droits humains & IA"
                    stroke="#ff7300"
                    fill="#ff7300"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Gouvernance IA"
                    dataKey="Gouvernance IA"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Capacités IA"
                    dataKey="Capacités IA"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;