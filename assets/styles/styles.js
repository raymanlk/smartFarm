const primaryColor = '#000';
const colorMain = '#000';

export const common = {
  flex1: {
    flex: 1,
  },
  background: {
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 5,
  },
  fullHeight: {
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  noMr: {
    margin: 0,
  },
  greenBorder: {
    borderColor: '#00B761',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowSpread: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  fullWidthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  fullWidthRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  //column layout
  justifyCenter: {
    justifyContent: 'center',
  },
  columnCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  column: {
    flexDirection: 'colum',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollView: {
    overflow: 'visible',
  },

  mrTop: {
    marginTop: 30,
  },
  //hr
  hr: {
    borderBottomColor: '#525F67',
    borderBottomWidth: 1,
    opacity: 0.3,
  },

  white: {
    color: 'white',
  },
  black: {
    color: 'black',
  },

  //back
  backIcon: {
    position: 'absolute',
    zIndex: 100,
    top: 50,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  backIconBlack: {
    position: 'absolute',
    zIndex: 100,
    top: 50,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: 'black',
  },
  backOther: {
    marginTop: 70,
    width: '100%',
  },
  //Quick select
  quickSelectItem: {
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickSelectItemIcon: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#525F67',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickSelectItemIconText: {
    textAlign: 'center',
    color: '#525F67',
    fontSize: 12,
    paddingVertical: 5,
  },
  quickSelectItemIconActive: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00B761',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickSelectItemIconTextActive: {
    textAlign: 'center',
    color: '#00B761',
    fontSize: 12,
    paddingVertical: 5,
  },

  //titles
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  //title section
  titleSection: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B1F41',
    marginVertical: 10,
  },
  titleSectionWhite: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  titleSectionBlack: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    marginVertical: 10,
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
  center: {
    textAlign: 'center',
  },

  //main input
  customInput: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  customInputSmalll: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '40%',
    marginBottom: 20,
  },
  customInputLable: {
    fontWeight: '500',
    fontSize: 15,
    color: '#0B1F41',
    marginBottom: 4,
  },
  customInputLabletwo: {
    fontWeight: '300',
    fontSize: 15,
    color: '#0B1F41',
    marginBottom: 4,
  },
  mainInput: {
    borderColor: '#000000',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 2,
    color: '#0B1F41',
    fontSize: 15,
    width: '100%',
    backgroundColor: '#fff',
  },
  mainInputArea: {
    borderColor: '#000000',
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 6,
    borderRadius: 2,
    color: '#0B1F41',
    fontSize: 15,
    width: '100%',
    backgroundColor: '#fff',
  },

  customInputLableWhite: {
    fontWeight: '500',
    fontSize: 15,
    color: 'white',
    marginBottom: 8,
  },
  mainInputWhite: {
    borderColor: 'white',
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
    fontSize: 15,
    width: '100%',
  },
  mainInputGrey: {
    borderColor: '#525F67',
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#0B1F41',
    fontSize: 15,
    width: '100%',
  },
  propertyInputGrey: {
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 12,
    width: '100%',
  },

  mrLeft: {
    marginLeft: 10,
  },
  mrRight: {
    marginRight: 10,
  },

  //mesageCard
  messageCard: {
    borderColor: '#E7E7E7',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 15,
    position: 'relative',
    flex: 1,
  },
  userLogo: {
    width: 80,
    height: 80,
    borderRadius: 100,
    overflow: 'hidden',
    resizeMode: 'cover',
    backgroundColor: 'green',
  },
  userLogoImage: {
    resizeMode: 'contain',
  },
  messageInfo: {
    paddingLeft: 10,
    flex: 1,
  },
  messageTitle: {
    textAlign: 'left',
    color: '#0D1C2E',
    fontWeight: '600',
    fontSize: 15,
  },
  messageUser: {
    textAlign: 'left',
    color: '#00B761',
    fontWeight: '400',
    fontSize: 12,
    paddingTop: 5,
  },
  MessageCont: {
    textAlign: 'left',
    color: '#707C97',
    fontWeight: '400',
    fontSize: 13,
    paddingTop: 5,
    flexWrap: 'wrap',
    flexShrink: 1,
    flex: 1,
  },

  //upload container
  uploadCover: {
    marginTop: 20,
  },
  uploadContainer: {
    borderWidth: 2,
    borderColor: '#00B761',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  uploadContainer2: {
    borderWidth: 2,
    borderColor: '#00B761',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  uploadContainerText: {
    fontSize: 15,
    fontWeight: '400',
    marginTop: 15,
    color: '#00B761',
    textAlign: 'center',
  },
  uploadContainerActive: {
    backgroundColor: '#00B761',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  uploadContainerTextActive: {
    fontSize: 15,
    fontWeight: '400',
    marginTop: 15,
    color: 'white',
    textAlign: 'center',
  },

  //step counts
  stepCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00B761',
    textAlign: 'right',
  },
};
