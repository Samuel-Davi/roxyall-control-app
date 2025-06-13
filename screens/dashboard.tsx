import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chart from '@/components/layout/pages/Chart';
import { SliceLabel } from 'react-native-pie-chart';
import { totalByCategory } from '@/utils/utils';
import { User, Transaction } from '@/types/types';
// import { SQLiteContext } from '@/services/sqliteContext';
import { SQLiteDatabase } from 'expo-sqlite';
// import { useTransactions } from '@/context/TransactionContext';


export type typeData = {
    label: SliceLabel;
    value: number;
    color: string;
    legendValue:string;
}

const colors = ['#00FFFF', '#00CC99', '#0066FF', '#8A2BE2', '#FF00FF', '#FFD700']
const categories = ['Alimentação', 'Despesas Fixas', 'Lazer', 'Transporte', 'Saúde', 'Outros']

export async function teste(user: User | null, db: SQLiteDatabase, setState:(value: React.SetStateAction<Transaction[] | null>) => void){

}

export default function Dashboard(){

  // const db = useContext(SQLiteContext)
  // const {transactions, addTransaction} = useTransactions()
  const [graficoData, setGraficoData] = useState<typeData[]>([{
    label: {text:'ABC'}, 
    value: 30,
    color: 'white',
    legendValue: 'teste'
  }])

  // useEffect(() => {
  //   transactions?.map(() => {
  //     const fixedData:typeData[] = [];

  //     categories.map(item => fixedData.push({
  //       label: {text: '', fontWeight: 'bold'},
  //       value: totalByCategory(item, transactions) < 0 ? totalByCategory(item, transactions)*-1 : totalByCategory(item, transactions),
  //       color: colors[categories.indexOf(item)],
  //       legendValue: item
  //     }))

  //     const filteredData = fixedData.filter(item => item.value > 0)

  //     const total = fixedData.reduce((sum, val) => sum + val.value, 0)

  //     const data:typeData[] = filteredData.map((item:typeData) => ({
  //         ...item,
  //         label:{
  //             ...item.label,
  //             text: verificaTamanhoArco(((item.value/total)*100)) ? (((item.value/total)*100).toFixed(1)).toString() + '%' : ''
  //         }
  //     }))
  //     setGraficoData(data)
  //   })
  // }, [transactions, addTransaction])

  const verificaTamanhoArco = (val:number) =>{
    return val > 5 ? true : false
  }

  return (
    <View style={styles.allScreen}>
      {/* <View style={styles.main}>
        <Text style={{color: 'white', fontSize: 32}}>Gastos:</Text>
        {transactions && (
          <Chart
            data={graficoData}    
          />
        )}
        {transactions && (
          <View style={styles.legendContainer}>
              {graficoData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                  <View
                  style={[styles.legendColor, { backgroundColor: item.color }]}
                  />
                  <Text style={[styles.legendText]}>
                      {item.legendValue}
                  </Text>
              </View>
              ))}
          </View>
        )}
        {!transactions && (
          <View>
            <Text style={{color: 'white'}}>Sem gastos até o momento</Text>
          </View>
        )}
      </View> */}
      <Text style={styles.legendText}>Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    allScreen:{
        flex:1,
        backgroundColor: '#0f172a',
        alignItems: 'center',
    },
    main:{
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 18,
        marginTop: 40,
        width: '90%',
        height: '65%'
    },
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '50%',
        marginTop: 20,
      },
      legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 10,
      },
      legendColor: {
        width: 15,
        height: 15,
        borderRadius: 5,
        marginRight: 5,
      },
      legendText: {
        fontSize: 14,
        color: '#7F7F7F',
      },
})